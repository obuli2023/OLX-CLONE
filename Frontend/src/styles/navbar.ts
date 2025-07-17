import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon

export const NavbarStyle = styled.div`
  position: fixed; /* Make the navbar fixed at the top */
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  padding: 10px;
  background-color: #f2f2f2;
  display: flex; /* Use flex to align items */
  align-items: center; /* Center items vertically */
  z-index: 1000; /* High z-index to ensure it stays above other content */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Add shadow for better visibility */
`;

export const Logo = styled.img`
  width: 45px;
  height: auto;
  margin-left: 30px; /* Adjust margin for better alignment */
`;

export const BoxContainer = styled.div<{ $isActive?: boolean}>`
  display: flex;
  align-items: center;
  background-color: white;
  border: 2px solid ${(props) => (props.$isActive ? "aqua" : "black")};
  border-radius: 4px;
  padding: 5px;
  margin-left: 60px;
  height: 50px;
  cursor: pointer;
`;

export const Lens = styled.img`
  width: 20px;
  margin-right: 10px; /* Increase spacing for better alignment */
`;

export const Input = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  width: 200px;
`;

export const AllCategories = styled.a`
text-decoration:none;
color:#093138;
font-size:15px ;
font-weight:bold;

`;

export const StyledArrowUp = styled(IoIosArrowUp)`
  width: 30px; /* Adjust width as needed */
  height: 30px; /* Adjust height as needed */
  color:#093138;
  cursor: pointer;

`;

export const StyledArrowDown = styled(IoIosArrowDown)`
  width: 30px; /* Adjust width as needed */
  height: 30px; /* Adjust height as needed */
  color:#093138;
   cursor: pointer;
`;

export const LocationList = styled.ul<{ $isOpen: boolean }>`
display: ${(props) => (props.$isOpen? "block":"none" )};
  position: absolute;
  background-color: white;
  border: none;
  list-style: none;
  padding: 0;
  margin-left: -20x; /* Remove default margin */
  margin-top: -8px;
  width: 272px; /* Match BoxContainer width */
  top: 100%; /* Position below the BoxContainer */
  box-shadow: 0 -5px 3px -3px #e5e4e2, 0 5px 3px -3px #e5e4e2;

  max-height: 250px; /* Set a maximum height */
  overflow-y: auto; /* Enable vertical scrolling */

  /* For smooth scrolling */
  scrollbar-width: thin;
  scrollbar-color: #aaa #f0f0f0;

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 4px;
  }
  
`;

export const EachLocation = styled.li`
  display: flex; /* Use flexbox to align the icon and text in a row */
  align-items: center; /* Vertically center the items */
  padding: 10px;
  cursor: pointer;
  font-size: 15px; /* Increase the size of the location text */
  
  svg {
    font-size: 25px; /* Increase the size of the location icon */
    margin-right: 10px; /* Add space between the icon and the text */
  }

  &:hover {
    background-color: #c8f8f6; /* Change background color on hover */
  }
`;

export const SearchInput = styled.input`
  width: 550px; /* Set a fixed width or a long width */
  outline: none;
  border: none;
  padding: 5px;
`;

export const SearchLogo = styled.img`
  width: 3.7vw;
  height: 3.6vw;
  margin-right: -0.5vw;
  cursor: pointer;
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  background-color: white;
  border: none;
  list-style: none;
  padding: 0;
  margin-left: -6px; /* Remove default margin */
  margin-top: -8px;
  width: 550px; /* Match BoxContainer width */
  top: 100%; /* Position below the BoxContainer */
  max-height: 250px; /* Set a maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
  box-shadow: 0 -5px 3px -3px #e5e4e2, 0 5px 3px -3px #e5e4e2;

  /* For smooth scrolling */
  scrollbar-width: thin;
  scrollbar-color: #aaa #f0f0f0;

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 4px;
  }
`;


export const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  background-color: white;
  color: #333;
  transition: background-color 0.2s ease;
  border-bottom:1px ;

  &:hover {
    background-color: #c8f8f6;
  }
`;

export const UserIcon = styled(FaUserCircle)`
  font-size: 40px; // Set the size of the icon
  color: #000033; // Set the color of the icon
  margin-right: 10px; // Add some margin to the right
  margin-top:7px;
  margin-left:30px;
`;

export const LoginButton = styled.p`
  color: #000033;
  text-decoration-line: underline;
  margin-left: 40px;
  font-weight: bold;
   margin-bottom:10px;

  &:hover {
    cursor: pointer;
    text-decoration-line: none;
  }
`;


export const LogoutButton = styled.p`
  color: #000033;
  text-decoration-line: underline;
  margin-left: 25px;
  font-weight: bold;
  margin-bottom:10px;

  &:hover {
    cursor: pointer;
    text-decoration-line: none;
  }
`;

export const Category = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 80px; /* Adjust margin so it appears below the fixed navbar */
  background-color: #ffffff;
  box-shadow: 0 -5px 3px -3px #e5e4e2, 0 5px 3px -3px #e5e4e2;
  display: flex; /* Use flex to align items */
  align-items: center; /* Center items vertically */
  padding: 0 10px; /* Add padding for better spacing around the contents */

  h4 {
    display: inline-block;
    margin-left: 15px;
  }
  
   `;

export const CategoryItem = styled.span`
  display: inline-block;
  font-size: 14px; /* Font size */
  margin-left: 15px; /* Space before the category */
  margin-right: 20px; /* Space after the category */
  cursor: pointer; 

  &:hover {
    color: #A4DDED; /* Hover color */
  }
  /* Add margin to the arrow for spacing */
  
`;

export const PopularSearch = styled.div`
  padding: 5px;
  margin-top: 2px;
  display: inline-block;
  background-color: #ffffff;
  font-size: 10px;

  h3 {
    display: inline-block;
    margin-left: 10px;
    margin-top: 10px;
    margin-right: 5px; /* Add some spacing between the heading and the text */
  }

  span {
    display: inline-block;
    font-size: 12px;
    margin-left: 20px;
  }
`;

export const Banner = styled.div`
  background-color: #f8f8f8;
  padding: 20px 0; /* Reduce padding to control the height, and limit padding to top and bottom */
  margin-top: 5px;
  position: relative; /* You can use this to position the image more flexibly if needed */
`;

export const BannerImage = styled.a`
  display: block;
  text-align: center; /* Ensure the image is centered horizontally */

  img {
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 70%; /* Adjust this width as needed for image size */
    padding: 0; /* Remove padding to avoid additional space around the image */
    margin-top: 0; /* Align image to the top of the banner */
  }
`;

export const SellerLogin = styled.a`
  display: inline-block;
  margin-left: 20px; /* Adjust the margin as needed */
  
  img {
    width: 120px; /* Adjust the width of the seller button */
    height: auto;
    cursor: pointer;
  }
`;

export const CategoryDropdown = styled.div`
  width: 15px;
  cursor: pointer;
  margin-top: 2px;
  margin-left: 5px; 
  display: inline-block;
`;

export const CategoryList = styled.ul`
  position: absolute; /* Position it relative to its parent */
  background-color:#f2f2f2 ; /* Background for the dropdown */
  list-style: none; /* Remove bullets */
  padding:0;
  margin-top : 350px;
  margin-left: 40px;
  width: 200px; /* Set a width for the dropdown */
  z-index: 1000; /* Ensure it's above other elements */
  display: flex; /* Use flex to arrange items */
  flex-direction: column; /* Stack items vertically */
  
`;

export const EachCategory = styled.li`
  padding: 10px; /* Adjust padding for clickable area */
  cursor: pointer;
  margin: 0; /* Reset margin for consistency */

  &:hover {
    color:#00CED1; /* Highlight on hover */
  }
`;
export const CategoryContainer = styled.div`
  display: flex;
  size:3px;
  gap: 0px; /* Space between each category item */
  margin-left: 10px; /* Margin from the left */
  align-items: center; /* Center align items vertically */
`;
