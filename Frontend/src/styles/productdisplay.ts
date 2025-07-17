import styled from 'styled-components';


// Container for the entire product display page
export const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between; // Ensure space between image and details
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
  background-color:#F1F2F3;
   
`;

export const LeftContainer = styled.div`
  width: 60%; // Adjust width as needed
  display: flex
  flex-direction: column; // Stack details vertically
`;

// Right side container for price and seller info
export const RightContainer = styled.div`
  width: 35%; // Adjust width as needed
  margin-left: 20px; // Space between left and right containers
  display: flex;
  flex-direction: column; // Stack price and seller info vertically
  gap: 20px; // Space between sections
`;


// Wrapper for the product image, stretched to screen width
export const ImageWrapper = styled.div`
  width: 1260px; // Full viewport width
  background-color: black; // Background color for the image container
  display: flex;
  justify-content: center; // Center the image horizontally
  align-items: center; // Center the image vertically
  margin-left:-20px;
 

  img {
    width: 400px; // Make the image responsive
    height: 410px; // Maintain aspect ratio 
    max-height: 500px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;



// Wrapper for the title section
export const TitleWrapper = styled.div`
  background-color: white; // Background color for title section
  padding: 15px; // Add padding
  border-radius: 5px; // Rounded corners
  margin-top: 10px; // Space above title
  border: 1px solid #d3d3d3;
  border-radius: 5px;
`;

// Product title styling
export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  color: #1E2952;

`;
export const Overview = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #A5C0CA;
  margin-top:0px;
  
`;

// Wrapper for the product details section
export const DetailsWrapper = styled.div`
  background-color: white; // Background color for details section
  padding: 15px; // Add padding
  border-radius: 5px; // Rounded corners
  margin-top: 10px; // Space above details
  border: 1px solid #d3d3d3;
  border-radius: 5px;
`;

// Brand or category of the product
export const Brand = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 5px 0;
  color: #555;
`;

export const Description = styled.h5`
  font-size: 15px;
  font-weight: 500;
  margin: 5px 0px;
  color: #555;
`;

// Additional details like condition
export const Condition = styled.p`
  font-size: 15px;
  color: #666;
`;



// Wrapper for the price, location, and date section
export const PriceContainer = styled.div`
 display:flex;
 flex-direction:column;
  padding: 20px;
  background-color: white; // Background color for price section
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-top:420px;

   svg{
   margin-top:10px;
   margin-left:-5px;
  font-size:30px;
  color: #1E2952;
  } 
  
`;

// Styling for the product price
export const Price = styled.span`
  font-size: 26px;
  font-weight: bold;
  color:#1E2952;
`;

// Location text styling
export const Location = styled.span`
  font-size: 20px;
  color: #1E2952;
  margin-top:-28px;
  margin-left: 30px;
 
`;
// Date posted text styling
export const DatePosted = styled.span`
  font-size: 20px;
  color: #1E2952;
  margin-top:-28px;
  margin-left: 30px;
`;

// Container for seller information and chat button
export const SellerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding:40px;
  background-color: white; // Background color for price section
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
`;

export const ProfileImage = styled.img`
  width: 70px; // Set the desired width
  height: 70px; // Set the desired height
  margin-top: -20px;
  border-radius: 50%; // Optional: Makes the image circular
   // Ensures the image covers the area without distortion
`;

// Seller name text styling
export const SellerName = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #1E2952;
  margin-top: -70px;
  margin-left: 80px;
`;

// Contact information styling
export const ContactInfo = styled.span`
  font-size: 16px; // Set font size
  color: #555; // Set text color
  margin-top: -5px;
  margin-left: 80px;
`;

// Button styling for the 'Buy Product' button
export const BuyButton = styled.button`
  padding: 15px 20px;
  font-size: 16px;
  color: white;
  background-color: #0C2340; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: white; 
    border:4px solid #0C2340 ;
    color : #0C2340;
  }
`;
