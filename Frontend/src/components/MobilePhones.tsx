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
import API_BASE_URL from '../config';

const MobilePhones = () => {
  const [phones, setPhones] = useState<Product[]>([]); // All mobile phone data
  const [filteredPhones, setFilteredPhones] = useState<Product[]>([]); // Filtered mobile phones
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

  // Fetch mobile phones data on component mount
  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Product?category=Mobilephones`);
        const data: Product[] = await response.json();
        setPhones(data);
        
        // Initialize liked items based on API data
        const liked = data.filter(phone => phone.isLiked).map(phone => phone.id);
        setLikedItems(liked);

        // If a productId is passed, filter to show only that product
        if (productId) {
          const filteredById = data.filter((phone) => phone.id === productId);
          setFilteredPhones(filteredById);
        } else {
          setFilteredPhones(data); // Set initial filtered phones to show all phones
        }
      } catch (error) {
        console.error('Error fetching mobile phones data:', error);
      }
    };
    fetchPhones();
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

    const isCurrentlyLiked = likedItems.includes(id); // Check if the item is already liked

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

  // Handle location change and filter phones based on the selected location
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);

    if (location === '') {
      // If no location selected, reset to all phones
      setFilteredPhones(phones);
    } else {
      // Filter phones by selected location
      const filteredByLocation = phones.filter(phone => phone.location.toLowerCase() === location.toLowerCase());
      setFilteredPhones(filteredByLocation);
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

  // Handle search results from the Navbar and update the filtered phones list
  const handleSearchResults = (results: Product[]) => {
    setFilteredPhones(results); // Update displayed phones to search results
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
          products={phones} 
          setFilteredProducts={setFilteredPhones}
        />
        
      <Title>Buy & Sell Mobile Phones</Title>
      
      <Container>   
        <SideNavbar products={phones} setFilteredProducts={setFilteredPhones} /> 
        <RecommendationsGrid>
          {filteredPhones.map((phone) => (
            <RecommendationCard key={phone.id} onClick={() => handleCardClick(phone.id)}>
              <ImageWrapper>
                <img src={phone.imageUrl} alt={phone.title} />
                <FavoriteIcon 
                $isLiked={likedItems.includes(phone.id)} 
                isAuthenticated={isAuthenticated}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  toggleLike(phone.id);
                }}
              >
                <FaHeart />
              </FavoriteIcon>
              </ImageWrapper>
              <ContentWrapper>
                <Description>{phone.title}</Description>
                <Price>₹{phone.price}</Price>
                <Location>{phone.location}</Location>
                <DatePosted>{formatDate(phone.datePosted)}</DatePosted>
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

export default MobilePhones;
