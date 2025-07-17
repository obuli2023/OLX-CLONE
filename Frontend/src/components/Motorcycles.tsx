import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container,Title, RecommendationsGrid, RecommendationCard, 
  ImageWrapper, ContentWrapper, Price, Description, 
  Location, DatePosted, FavoriteIcon 
} from '../styles/categoryroutes';
import { FaHeart } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login';
import SideNavbar from './SideNavbar';
import { Product } from "../types/Product";
import SortProducts from './SortProduct'; // Import the SortProducts component

const Motorcycles = () => {
  const [motorcycles, setMotorcycles] = useState<Product[]>([]); // All motorcycles data
  const [filteredMotorcycles, setFilteredMotorcycles] = useState<Product[]>([]); // Motorcycles filtered by location
  const [likedItems, setLikedItems] = useState<number[]>([]); // Liked motorcycles IDs
  const [isLoginVisible, setLoginVisible] = useState(false); // Login modal state
  const [selectedLocation, setSelectedLocation] = useState<string>(''); // Selected location state
  const location = useLocation(); // Get location from router
  const productId = location.state?.productId; // Extract productId from location.state
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

  // Fetch motorcycles data on component mount
  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await fetch(`https://localhost:7048/api/Product?category=Motorcycles`); // Fetch motorcycles from API
        const data: Product[] = await response.json();
        setMotorcycles(data);
        
        // Initialize liked items based on API data
        const liked = data.filter(motorcycle => motorcycle.isLiked).map(motorcycle => motorcycle.id);
        setLikedItems(liked);

        // If a productId is passed, filter to show only that product
        if (productId) {
          const filteredById = data.filter((motorcycle) => motorcycle.id === productId);
          setFilteredMotorcycles(filteredById);
        } else {
          setFilteredMotorcycles(data); // Set initial filtered motorcycles to show all motorcycles
        }
      } catch (error) {
        console.error('Error fetching motorcycles data:', error);
      }
    };
    fetchMotorcycles();
  }, [productId]); // Re-run the effect if productId changes

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
      setLoginVisible(true); // Show login if not authenticated
      return;
    }
    
    const isCurrentlyLiked = likedItems.includes(id); // Check if the item is already liked

    try {
      // Optimistically update the UI
      setLikedItems((prev) =>
        isCurrentlyLiked ? prev.filter((item) => item !== id) : [...prev, id]
      );

      // Send PATCH request to the backend to update like status
      const response = await fetch(
        `https://localhost:7048/api/Product/${id}/like`,
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

  // Handle location change and filter motorcycles based on the selected location
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);

    if (location === '') {
      // If no location selected, reset to all motorcycles
      setFilteredMotorcycles(motorcycles);
    } else {
      // Filter motorcycles by selected location
      const filteredByLocation = motorcycles.filter(motorcycle => motorcycle.location.toLowerCase() === location.toLowerCase());
      setFilteredMotorcycles(filteredByLocation);
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

  // Handle search results from the Navbar and update the filtered motorcycles list
  const handleSearchResults = (results: Product[]) => {
    setFilteredMotorcycles(results); // Update displayed motorcycles to search results
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
          products={motorcycles} 
          setFilteredProducts={setFilteredMotorcycles}
      />
      <Title>Buy & Sell Motorcycles</Title>
        
      <Container>   
        <SideNavbar products={motorcycles} setFilteredProducts={setFilteredMotorcycles} /> 
        <RecommendationsGrid>
          {filteredMotorcycles.map((motorcycle) => (
            <RecommendationCard key={motorcycle.id} onClick={() => handleCardClick(motorcycle.id)}>
              <ImageWrapper>
                <img src={motorcycle.imageUrl} alt={motorcycle.title} />
                <FavoriteIcon 
                $isLiked={likedItems.includes(motorcycle.id)} 
                isAuthenticated={isAuthenticated}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  toggleLike(motorcycle.id);
                }}
              >
                <FaHeart />
              </FavoriteIcon>
              </ImageWrapper>
              <ContentWrapper>
                <Description>{motorcycle.title}</Description>
                <Price>₹{motorcycle.price}</Price>
                <Location>{motorcycle.location}</Location>
                <DatePosted>{formatDate(motorcycle.datePosted)}</DatePosted>
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

export default Motorcycles;
