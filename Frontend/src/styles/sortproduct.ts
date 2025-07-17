import styled from "styled-components";

export const SortContainer = styled.div`
  margin-top: 50px;
  margin-left: 1000px;
  box-sizing: border-box;
  margin-bottom: -70px;
`;

export const SortLabel = styled.label`
  margin-right: 10px;
  margin-bottom: -20px;
  position: relative; /* Enable positioning */
  top: 30px; /* Adjust vertical position, modify as needed */
  right: 70px;
  font-weight: medium;
  font-size: 14px;
`;

export const DropdownButton = styled.div`
  padding: 10px; /* Adjust padding for better spacing */
  background-color: transparent; /* Remove background */
  color: #333; /* Default text color */
  cursor: pointer;
  width: auto; /* Adjust width to fit text */
  height: auto; /* Set height automatically */
  display: flex;
  align-items: center;
  border: none; /* Remove border */
  font-size: 14px; /* Match font size */

  svg{
  margin-left:15px;
  font-size:20px;
  
  }
`;

export const OptionsList = styled.ul`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style: none;
  padding: 0;
  margin-left: -10px;
  width: 200px; /* Match the width */
  max-height: 200px; /* Increased maximum height */
  overflow-y: auto; /* Enable scrolling */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const DropdownItem = styled.p`
  padding: 12px; /* Increased padding for better spacing */
  cursor: pointer;
  margin: 0; /* Reset margin */
  font-size: 15px;

  &:hover {
    background-color: #c8f8f6; /* Change background color on hover */
  }
`;
