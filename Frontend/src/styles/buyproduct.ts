import styled from 'styled-components';

export const BuyProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9; // Adjust as necessary
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: #1E2952; 
`;

export const Info =styled.div`
 font-size: 20px;
 font-weight: bold;
 margin-left: 30px;
 margin-bottom: 12px;
 color: #1E2952;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd; // Adjust as necessary
`;

export const Label = styled.span`
  font-weight: bold;
  color: #1E2952; // Adjust color
`;

export const Value = styled.span`
  color: #333; // Adjust color
`;

export const PaymentButton = styled.button`
  background-color: #28a745; // Green color for the button
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #218838; 
  }
`;

export const CloseButton = styled.button`
  background-color: transparent;
  color: #dc3545; // Red color for the close button
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    text-decoration: underline; // Underline on hover
  }
`;
