import { useEffect, useState } from "react";
import {
  Container,
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
} from "../styles/home"; // Import styled components
import { FaHeart } from "react-icons/fa";
import Navbar from "./Navbar";
import Login from "./Login";
import Footer from "./Footer";
import { Product } from "../types/Product"; // Import Product type
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const FavoriteProducts = () => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [likedItems, setLikedItems] = useState<number[]>([]); // State for liked items
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false); // Track authentication status

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A"; // Return a placeholder if the date is undefined
  
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0'); // Pad with leading zero if needed
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Fetch all products from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Product`);
        const data: Product[] = await response.json();
        setRecommendations(data);

        // Filter liked items where isLiked is true
        const likedProducts = data.filter((item) => item.isLiked);
        setFilteredRecommendations(likedProducts);
        setLikedItems(likedProducts.map(item => item.id)); // Update liked items state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // Fetch data once when the component mounts

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthenticated(true); // Assume user is authenticated if a token exists
    }
  }, []);

  const handleCardClick = (id: number) => {
    if (!isAuthenticated) {
      setLoginVisible(true); // Show login popup if not authenticated
    } else {
      navigate(`/product/${id}`); // Navigating to the ProductDisplay page with the product ID
    }
  };

  // Handle unlike functionality
  const handleUnlike = async (id: number) => {
    try {
      // Optimistically update the UI
      setFilteredRecommendations((prev) => prev.filter((item) => item.id !== id));

      // Send PATCH request to the backend to update the like status
      const response = await fetch(`${API_BASE_URL}/Product/${id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(false), // Send false to set isLiked to false
      });

      if (!response.ok) {
        throw new Error(`Failed to update like status for product ${id}`);
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
    } catch (error) {
      console.error("Error updating like status:", error);

      // Revert the UI change in case of an error
      setFilteredRecommendations((prev) => [
        ...prev,
        recommendations.find((item) => item.id === id) as Product,
      ]);
    }
  };

  // Show the login modal when "Login" is clicked
  const handleLoginClick = () => {
    setLoginVisible(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the token from local storage
    setAuthenticated(false); // Update the authentication state
  };

  // Close the login modal
  const handleCloseLogin = () => {
    setLoginVisible(false);
  };

  // Handle successful login
  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('authToken', token); // Store the token in localStorage
    setAuthenticated(true); // Update the authenticated state on successful login
    setLoginVisible(false); // Close the login modal after successful login
  };

  return (
    <>
      <Navbar 
        onLoginClick={handleLoginClick}  
        onLogoutClick={handleLogout}
        onLocationSelect={() => {}} // Placeholder for any location selection handling
        onSearchResults={() => {}} // Placeholder for search handling
      />

      <Container>
        <RecommendationsHeading>Favorite Products</RecommendationsHeading>
        <RecommendationsGrid>
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((item) => (
              <RecommendationCard key={item.id} onClick={() => handleCardClick(item.id)}>
                <ImageWrapper>
                  <FavoriteIcon
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event from bubbling up
                      handleUnlike(item.id); // Call the unlike handler
                    }}
                    $isLiked={true}
                    isAuthenticated={true} // Always true for favorite products
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
            ))
          ) : (
            <p>No favorite products found.</p>
          )}
        </RecommendationsGrid>
      </Container>

      {isLoginVisible && <Login onClose={handleCloseLogin} onLoginSuccess={handleLoginSuccess} />}
      <Footer />
    </>
  );
};

export default FavoriteProducts;
