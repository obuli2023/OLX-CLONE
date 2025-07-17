import React, { useState } from "react";
import {
  ModalOverlay,
  LoginModal,
  Input
} from "../styles/login"; // Reuse styled components from Login
import { RxCross2 } from "react-icons/rx";
import {
  BuyProductContainer,
  Title,
  ProductDetails,
  DetailRow,
  CloseButton,
  Label,
  Value,
  PaymentButton,
  Info
  // New styled component for input fields
} from '../styles/buyproduct'; // Import styled components for BuyProduct

interface BuyProductProps {
  onClose: () => void;
  product: {
    id:number,
    title: string;
    brand: string;
    condition: string;
    price: number;
  };
}

const BuyProduct = ({ onClose, product }: BuyProductProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayment = async () => {
  
      try {
        // Update product's isSold state to true
        const response = await fetch(`https://localhost:7048/api/Product/${product.id}/sell`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(true), // Sending isSold status as true
        });
  
        if (!response.ok) {
          throw new Error("Failed to update product status.");
        }
  
        // If the request is successful
        alert("Payment Successful! Thank You");
        onClose();
      } catch (error) {
        console.error("Error updating product status:", error);
        setErrorMessage("Failed to process the payment. Please try again.");
      }
    
  };
  
  return (
    <ModalOverlay>
      <LoginModal>
        <CloseButton onClick={onClose}>
          <RxCross2 />
        </CloseButton>


        {/* Product Details */}
        <BuyProductContainer>
          <Title>Product Details</Title>
          <ProductDetails>
            <DetailRow>
              <Label>Product Title:</Label>
              <Value>{product.title}</Value>
            </DetailRow>
            <DetailRow>
              <Label>Brand:</Label>
              <Value>{product.brand}</Value>
            </DetailRow>
            <DetailRow>
              <Label>Condition:</Label>
              <Value>{product.condition}</Value>
            </DetailRow>
            <DetailRow>
              <Label>Price:</Label>
              <Value>₹{product.price}</Value>
            </DetailRow>
          </ProductDetails>

          {/* Payment Button */}
          <PaymentButton onClick={handlePayment}>Make Payment</PaymentButton>

          {/* Error Message */}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </BuyProductContainer>
      </LoginModal>
    </ModalOverlay>
  );
};

export default BuyProduct;
