import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export const SidebarContainer = styled.div`
  position: sticky;
  width: 300px;
  padding: 30px;
  background-color: white;
  border-right: 1px solid #ddd;
  max-height: 100vh; /* Ensures it takes at least the full viewport height */
  margin-left: -10px;
  overflow-y: auto; /* Allows scrolling if content grows too large */
  margin-top:-40px;
`;
export const Title = styled.i`
font-size:18px;
color:#002f34;
margin-left:-19px;
`;


export const ArrowDown = styled(IoIosArrowDown)`
  color: #1E2952; /* Customize the color as needed */
  font-size: 30px; /* Customize the size as needed */
  transition: transform 0.3s ease; /* Add a transition effect if you want */
`;

// Styled component for the up arrow
export const ArrowUp = styled(IoIosArrowUp)`
  color: #1E2952; /* Customize the color as needed */
  font-size: 30px; /* Customize the size as needed */
  transition: transform 0.3s ease; /* Add a transition effect if you want */
`;

// Container for the arrows
export const ArrowContainer = styled.div`
  display: flex; /* Use flexbox for alignment */
  flex-direction: column; /* Stack arrows vertically */
  align-items: flex-end; /* Align to the right */
  margin-left: 10px; /* Adjust the spacing as needed */
`;


export const FilterSection = styled.div`
  margin-bottom: 15px;
  margin-right:-10px;
  max-height: 30vh;
  overflow-y: auto;

  scrollbar-width: thin; /* Sets scrollbar to thin */
  scrollbar-color: #1E2952 transparent; /* Handle color and transparent track */
  
`;


export const FilterTitle = styled.h3`
  margin-top: 10px;
  margin-left: 0px;
  font-size: 18px;
  font-family: "Gill Sans Bold", sans-serif;
  margin-bottom: 18px;
  color: #0d384a;
  display: flex; /* Allow flexibility for child elements */
  justify-content: space-between; /* Space out title and arrows */
  align-items: center; /* Center vertically */
  cursor: pointer; /* Change cursor to pointer for better UX */
`;



export const FilterItem = styled.div<{ isActive: boolean }>`
  padding: 5px;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#c8f8f6' : 'transparent')};
  color: ${({ isActive }) => (isActive ? '#0d384a' : '#5c7a7d')};
  margin-bottom: 5px;
  
  &:hover {
    background-color: #c8f8f6;
  }
`;


export const CheckboxLabel = styled.label`
  font-size: 15px;
  font-weight:normal;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #0d384a;

  &:hover{
  color:#1E2952;
  
  }
    input[type='checkbox'] {
    appearance: none;
    width: 22px;
    height: 22px;
    border: 2px solid #b6baba;
    border-radius: 1px;
    margin-right: 10px;
    position: relative;
    outline: none;
    cursor: pointer;
  
    transition: background-color 0.3s ease;

    &:checked {
      background-color: #1E2952; /* Change background color when checked */
      border-color: #1E2952; /* Change border color when checked */
    }
    &:hover{
    border-color:#1E2952;
    }

    &::before {
      content: '✔';    
      display: none;
      position: absolute;
      top: 0;
      left: 2px;
      font-size: 14px;
      color: white;
    }

    &:checked::before {
      display: block;
    }
  }
  
`;


export const DateFilter = styled(FilterSection)`
  margin-bottom: 10px;
`;
