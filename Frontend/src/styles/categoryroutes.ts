import styled from "styled-components";

export const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2); // Dim effect
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  z-index: 999; // Ensure it's on top
`;

export const Title =styled.h1`

margin-left:40px;
`;

// Container for the entire page
export const Container = styled.div`
  display: flex; /* Use flexbox for layout */
  background-color: white;
  padding: 20px;
  max-width: 1200px; /* Increase the width of the container */
  margin: 0 auto; /* Center the container */
  gap: 20px; /* Added gap between side navbar and main content */
  
`;
// Side Navbar container

// Main content area
export const MainContent = styled.div`
  flex: 1; /* Take the remaining space */
  padding-left: 20px; /* Space between sidebar and main content */
`;


// Section for fresh recommendations
export const FreshRecommendations = styled.div`
  margin-top: 20px;
`;

// Heading for fresh recommendations
export const RecommendationsHeading = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

// Grid layout for recommendation cards
export const RecommendationsGrid = styled.div`

  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr)); /* Auto-fit columns for responsiveness */
  gap: 20px; 
  width: 103%;
  mix-height: 700px;  
  margin-left:30px;
`;

// Card component for each recommendation
export const RecommendationCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px; /* Maintain consistent card width */
  max-height: 320px; 
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
`;


// Image wrapper for recommendation card
export const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  background-color: #eaeaea;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Content inside each recommendation card
export const ContentWrapper = styled.div`
  padding: 10px 15px;
`;

// Price text inside recommendation card
export const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
`;

// Description text inside recommendation card
export const Description = styled.p`
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
`;

// Location text inside recommendation card
export const Location = styled.p`
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
`;

// Date posted text inside recommendation card
export const DatePosted = styled.p`
  font-size: 12px;
  color: #999;
  text-align: right;
`;

// Favorite (heart) icon component
export const FavoriteIcon = styled.div<{ $isLiked: boolean; isAuthenticated: boolean }>`
  color: ${({ $isLiked, isAuthenticated }) => (isAuthenticated && $isLiked ? "red" : "white")}; // Red if liked and authenticated, white otherwise
  position: absolute; 
  top: 10px; 
  right: 10px; 
  width: 25px; 
  height: 25px; 
  cursor: pointer;  
  font-size: 25px; 
 
`;

// App download image component
export const AppDownloadImage = styled.img`
  width: 100%;
  margin-top: 20px;
`;

// Footer container for all sections
export const FooterContainer = styled.div`
  background-color: #f2f2f2;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 20px;
  height: 200px;
`;

// Footer section
export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 80px;
`;

// Footer section title
export const FooterTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-top: -10px;
  margin-bottom: 1px;
  color:#002244;
  
`;

// Footer link (text) component
export const FooterLink = styled.a`
  font-size: 13px;
  color: #666;
  margin: 10px 3px -10px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #333;
  }
`;

// Wrapper for social media icons
export const SocialIconWrapper = styled.div`
  display: flex;
  gap: 10px; /* Space between icons */
  margin-bottom: 10px;
`;

// Wrapper for app store icons
export const AppIconWrapper = styled.div`
  display: flex;
  gap: 10px; /* Space between icons */
  margin-top: 10px;
`;

// Footer bottom container for the logos and text
export const FooterBottomContainer = styled.div`
  background-color: #002e2e;
  padding: 80px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Container for the logos
export const LogosContainer = styled.div`
  display: flex;
  margin-top: -20px;
  justify-content: center;
  gap: 40px;  // Space between the logos

  img {
    height: 70px;  // Adjust the height of the logos as needed
  }
`;

// Bottom text (Help, Sitemap, Rights)
export const FooterBottomText = styled.div`
  display: flex; /* Use flexbox for layout */
  justify-content: space-between; /* Space between left and right items */
  width: 100%; /* Full width to allow positioning */
  max-width: 1200px; /* Optional: limit width for larger screens */
  padding: 0 10px; /* Add some padding to the sides */
  margin-bottom: -60px; /* Space above */
`;

// Links for Help and Sitemap
export const FooterLinks = styled.a`
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
`;

// Text for the rights information
export const RightsText = styled.p`
  font-size: 12px;
  color: #ffffff;
  margin: 0; /* Remove margin to align text */
`; 
