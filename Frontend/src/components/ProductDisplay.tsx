import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import {
  ProductContainer,
  LeftContainer,
  RightContainer,
  ImageWrapper,
  TitleWrapper,
  Title,
  Overview,
  DetailsWrapper,
  Brand,
  Condition,
  Description,
  PriceContainer,
  Price,
  Location,
  DatePosted,
  SellerContainer,
  ProfileImage,
  SellerName,
  ContactInfo,
  BuyButton,
} from '../styles/productdisplay'; // Adjust the path as necessary
import { Product } from '../types/Product';
import Login from './Login';
import BuyProduct from './BuyProduct'; // Import the BuyProduct component
import API_BASE_URL from '../config';

import olxuser from '../images/olxuser.png';
import { BsCalendar4Event } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";

const ProductDisplay = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from the route params
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isBuyProductVisible, setBuyProductVisible] = useState(false); // State for BuyProduct modal


  const formattedDate = product?.datePosted
    ? new Date(product.datePosted).toLocaleDateString()
    : "Date not available"; // Fallback for undefined datePosted

  // Fetch product data based on the ID from the route
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Product/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Handle login modal visibility
  const handleLoginClick = () => {
    setLoginVisible(true);
  };

  const handleCloseLogin = () => {
    setLoginVisible(false);
  };

  // Handle BuyProduct modal visibility
  const handleBuyClick = () => {
    setBuyProductVisible(true);
  };

  const handleCloseBuyProduct = () => {
    setBuyProductVisible(false);
  };

  if (!product) {
    return <>Loading...</>;
  }

  return (
    <>
      <Navbar
        onLoginClick={handleLoginClick}
        onLogoutClick={()=>{}}
        onLocationSelect={() => {}}
        onSearchResults={() => {}}
      />
      <ProductContainer>
        <LeftContainer>
          <ImageWrapper>
            <img src={product.imageUrl} alt={product.title} />
          </ImageWrapper>
          <TitleWrapper>
            <Title>{product.title}</Title>
          </TitleWrapper>
          <DetailsWrapper>
            <Overview>Overview 
              <hr />
            </Overview>
            <Brand>Brand: {product.brand}</Brand>
            <Condition>Condition: {product.condition}</Condition>
          </DetailsWrapper>

          <DetailsWrapper>
            <Overview>Description
              <hr />
            </Overview>
            <Description>{product.description}</Description>
          </DetailsWrapper>  
        </LeftContainer>
        
        <RightContainer>
          <PriceContainer>
            <Price>₹ {product.price}</Price>
            <SlLocationPin />
            <Location>Location: {product.location}</Location>
            <BsCalendar4Event />
            <DatePosted>Posted Date: {formattedDate || 'Today'}</DatePosted>
            {/* Conditionally render the BuyButton based on isSold */}
            {!product.isSold && (
              <BuyButton onClick={handleBuyClick}>Buy Product</BuyButton>
            )}
          </PriceContainer>
          <SellerContainer> 
            <ProfileImage src={olxuser}/>
            <SellerName>Seller: {product.sellerName}</SellerName>
            <ContactInfo>Contact: {product.contactInfo}</ContactInfo>     
          </SellerContainer>
        </RightContainer>
      </ProductContainer>
      {/* Buy Product Component */}
      {isBuyProductVisible && (
        <BuyProduct
          product={{
            id: product.id,
            title: product.title,
            brand: product.brand,
            condition: product.condition,
            price: product.price,
          }}
          onClose={handleCloseBuyProduct}
        />
      )}
      {/* Login Component */}
      {isLoginVisible && <Login onClose={handleCloseLogin}  onLoginSuccess={() => {}} />}
      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default ProductDisplay;
