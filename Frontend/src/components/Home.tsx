import { useState, useEffect } from "react";
import {
  Container,
  FreshRecommendations,
  RecommendationsHeading,
  RecommendationsGrid,
  RecommendationCard,
  ImageWrapper,
  ContentWrapper,
  Price,
  Description,
  Location,
  DatePosted,
  FavoriteIcon,
  AppDownloadImage,
  SoldProductsSection,
  SoldProductsHeading,
} from "../styles/home";
import { FaHeart } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import appdownload from "../images/appdownload.png";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";

const HomePage = () => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [filteredRecommendations, setFilteredRecommendations] = useState<
    Product[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false); // Track authentication status
  const navigate = useNavigate();

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A"; // Return a placeholder if the date is undefined

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0"); // Pad with leading zero if needed
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7048/api/Product`);
        const data: Product[] = await response.json();
        setRecommendations(data);
        setFilteredRecommendations(data);

        // Set liked items based on the isLiked property
        const likedItems = data
          .filter((item) => item.isLiked)
          .map((item) => item.id);
        setLikedItems(likedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchResults.length > 0) {
      setFilteredRecommendations(searchResults);
    } else {
      setFilteredRecommendations(recommendations);
    }
  }, [searchResults, recommendations]);

  useEffect(() => {
    if (selectedLocation) {
      const filtered = recommendations.filter(
        (item) => item.location === selectedLocation
      );
      setFilteredRecommendations(filtered);
    } else {
      setFilteredRecommendations(recommendations);
    }
  }, [selectedLocation, recommendations]);

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    const filteredByLocation = recommendations.filter(
      (item) => item.location === location
    );
    setFilteredRecommendations(filteredByLocation);
  };

  const toggleLike = async (id: number) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoginVisible(true);
      return;
    }

    const isCurrentlyLiked = likedItems.includes(id);

    try {
      setLikedItems((prev) =>
        isCurrentlyLiked ? prev.filter((item) => item !== id) : [...prev, id]
      );

      const response = await fetch(
        `https://localhost:7048/api/Product/${id}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(!isCurrentlyLiked), // Send the boolean directly
        }
      );

      console.log("Response:", response); // Log the response object
      if (!response.ok) {
        const errorMessage = await response.text(); // Retrieve error message
        throw new Error(
          `Failed to update like status for product ${id}: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error updating like status:", error);
      setLikedItems((prev) =>
        isCurrentlyLiked ? [...prev, id] : prev.filter((item) => item !== id)
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthenticated(true); // Assume user is authenticated if a token exists
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("authToken", token); // Store the token in localStorage
    setAuthenticated(true); // Update the authenticated state on successful login
  };

  const handleLoginClick = () => {
    setLoginVisible(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token from local storage
    setAuthenticated(false); // Update the authentication state
  };

  const handleCloseLogin = () => {
    setLoginVisible(false);
  };

  const handleCardClick = (id: number) => {
    if (!isAuthenticated) {
      setLoginVisible(true); // Show login popup if not authenticated
    } else {
      navigate(`/product/${id}`); // Navigate to the product page if authenticated
    }
  };

  const handleSearchResults = (results: Product[]) => {
    setSearchResults(results);
  };

  useEffect(() => {
    if (isLoginVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoginVisible]);

  const unsoldProducts = filteredRecommendations.filter((item) => !item.isSold);
  const soldProducts = filteredRecommendations.filter((item) => item.isSold);

  return (
    <>
      <Navbar
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogout}
        onLocationSelect={handleLocationChange}
        onSearchResults={handleSearchResults}
      />

      <Container>
        <FreshRecommendations>
          <RecommendationsHeading>Fresh Recommendations</RecommendationsHeading>
          <RecommendationsGrid>
            {unsoldProducts.map((item) => (
              <RecommendationCard
                key={item.id}
                onClick={() => handleCardClick(item.id)}
              >
                <ImageWrapper>
                  <FavoriteIcon
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from affecting parent components
                      toggleLike(item.id); // Call toggle function on click
                    }}
                    $isLiked={likedItems.includes(item.id)} // Only check if the item is liked
                    isAuthenticated={isAuthenticated} // Pass isAuthenticated as a separate prop
                  >
                    <FaHeart />
                  </FavoriteIcon>

                  <img src={item.imageUrl} alt={item.title} />
                </ImageWrapper>
                <ContentWrapper>
                  <Price>₹ {item.price}</Price>
                  <Description>{item.title}</Description>
                  <Location>{item.location}</Location>
                  <DatePosted>{formatDate(item.datePosted)}</DatePosted>
                </ContentWrapper>
              </RecommendationCard>
            ))}
          </RecommendationsGrid>
        </FreshRecommendations>

        {soldProducts.length > 0 && (
          <SoldProductsSection>
            <SoldProductsHeading>Sold Products</SoldProductsHeading>
            <RecommendationsGrid>
              {soldProducts.map((item) => (
                <RecommendationCard
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                >
                  <ImageWrapper>
                    <FavoriteIcon
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click from affecting parent components
                        toggleLike(item.id); // Call toggle function on click
                      }}
                      $isLiked={likedItems.includes(item.id)} // Only check if the item is liked
                      isAuthenticated={isAuthenticated} // Pass isAuthenticated as a separate prop
                    >
                      <FaHeart />
                    </FavoriteIcon>

                    <img src={item.imageUrl} alt={item.title} />
                  </ImageWrapper>
                  <ContentWrapper>
                    <Price>₹ {item.price}</Price>
                    <Description>{item.title}</Description>
                    <Location>{item.location}</Location>
                    <DatePosted>{item.datePosted || "Today"}</DatePosted>
                  </ContentWrapper>
                </RecommendationCard>
              ))}
            </RecommendationsGrid>
          </SoldProductsSection>
        )}

        <AppDownloadImage src={appdownload} alt="App Download Banner" />
      </Container>

      {isLoginVisible && (
        <Login onClose={handleCloseLogin} onLoginSuccess={handleLoginSuccess} />
      )}
      <Footer />
    </>
  );
};

export default HomePage;
