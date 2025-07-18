import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, Title, RecommendationsGrid, RecommendationCard, 
  ImageWrapper, ContentWrapper, Price, Description, 
  Location, DatePosted, FavoriteIcon
} from '../styles/categoryroutes'; 
import { FaHeart } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login'; 
import SideNavbar from './SideNavbar'; 
import { Product } from "../types/Product";
import SortProducts from './SortProduct'; 
import API_BASE_URL from '../config';

const Watches = () => {
  const [watches, setWatches] = useState<Product[]>([]);
  const [filteredWatches, setFilteredWatches] = useState<Product[]>([]);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const location = useLocation(); 
  const productId = location.state?.productId; 
  const navigate = useNavigate();
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
    const fetchWatches = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Product?category=Watches`);
        const data: Product[] = await response.json();
        setWatches(data);

        const liked = data.filter(watch => watch.isLiked).map(watch => watch.id);
        setLikedItems(liked);

        if (productId) {
          const filteredById = data.filter((watch) => watch.id === productId);
          setFilteredWatches(filteredById);
        } else {
          setFilteredWatches(data);
        }
      } catch (error) {
        console.error('Error fetching watches data:', error);
      }
    };
    fetchWatches();
  }, [productId]); 

  // Check authentication status based on token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthenticated(true); // Assume user is authenticated if a token exists
    }
  }, []);

  // Toggle like functionality
  const toggleLike = async (id: number) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoginVisible(true);
      return;
    }

    const isCurrentlyLiked = likedItems.includes(id);

    try {
      // Optimistically update the UI
      setLikedItems((prev) =>
        isCurrentlyLiked ? prev.filter((item) => item !== id) : [...prev, id]
      );

      // Send PATCH request to the backend to update like status
      const response = await fetch(
        `${API_BASE_URL}/Product/${id}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the request
          },
          body: JSON.stringify(!isCurrentlyLiked), // Send the new like status
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update like status for product ${id}`);
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
    } catch (error) {
      console.error("Error updating like status:", error);

      // Revert UI change in case of an error
      setLikedItems((prev) =>
        isCurrentlyLiked ? [...prev, id] : prev.filter((item) => item !== id)
      );
    }
  };

  // Handle location change and filter watches based on the selected location
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);

    if (location === '') {
      setFilteredWatches(watches);
    } else {
      const filteredByLocation = watches.filter(watch => watch.location.toLowerCase() === location.toLowerCase());
      setFilteredWatches(filteredByLocation);
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

  // Handle search results from the Navbar and update the filtered watches list
  const handleSearchResults = (results: Product[]) => {
    setFilteredWatches(results); // Update displayed watches to search results
  };

  const handleCardClick = (id: number) => {
    if (!isAuthenticated) {
      setLoginVisible(true); // Show login popup if not authenticated
    } else {
      navigate(`/product/${id}`); // Navigating to the ProductDisplay page with the product ID
    }
  };

  return (
    <>
      <Navbar 
        onLoginClick={handleLoginClick}  
        onLogoutClick={handleLogout}
        onLocationSelect={handleLocationChange}
        onSearchResults={handleSearchResults}
      />
      
      {/* Sorting Dropdown */}
      <SortProducts 
          products={watches} 
          setFilteredProducts={setFilteredWatches}
      />
      
      <Title>Buy & Sell Watches</Title>
      <Container>     
        <SideNavbar products={watches} setFilteredProducts={setFilteredWatches} />
        <RecommendationsGrid>
          {filteredWatches.map((watch) => (
            <RecommendationCard key={watch.id} onClick={() => handleCardClick(watch.id)}>
              <ImageWrapper>
                <img src={watch.imageUrl} alt={watch.title} />
                <FavoriteIcon 
                $isLiked={likedItems.includes(watch.id)} 
                isAuthenticated={isAuthenticated}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  toggleLike(watch.id);
                }}
              >
                <FaHeart />
              </FavoriteIcon>
              </ImageWrapper>
              <ContentWrapper>
                <Description>{watch.title}</Description>
                <Price>₹{watch.price}</Price>
                <Location>{watch.location}</Location>
                <DatePosted>{formatDate(watch.datePosted)}</DatePosted>
              </ContentWrapper>
              
            </RecommendationCard>
          ))}
        </RecommendationsGrid>
      </Container>
      <Footer />
      
      {/* Login Modal */}
      {isLoginVisible && (
        <Login 
          onClose={handleCloseLogin}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

export default Watches;  
