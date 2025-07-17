import { useState } from "react";
import {
  ModalOverlay,
  LoginModal,
  Title,
  LoginForm,
  Input,
  Button,
  Error,
  Success,
  CarouselContainer,
  HasAccount,
  ArrowLeft,
  ArrowRight,
  CarouselImage,
  DotsContainer,
  Dot,
} from "../styles/login"; // Assuming you've defined these in your styled components

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import loginimg1 from "../images/loginimg1.png";
import loginimg2 from "../images/loginimg2.png";
import loginimg3 from "../images/loginimg3.png";

interface LoginProps {
  onClose: () => void;
  onLoginSuccess: (token: string) => void;
}

const Login = ({ onClose, onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Field for user role
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const [popupMessage, setPopupMessage] = useState<string | null>(null); // Success popup

  const images = [loginimg1, loginimg2, loginimg3];

  const handlePrevClick = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isRegister
      ? `https://localhost:7048/api/User/register`
      : `https://localhost:7048/api/User/login`;

    const body = JSON.stringify(
      isRegister ? { email, password, role } : { email, password }
    );

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (response.ok) {
        // Check if there's a body to parse
        const responseData = await response.json().catch(() => null); // Safely handle JSON parsing

        if (responseData) {
          if (isRegister) {
            setPopupMessage(responseData.message); // Use the message from the response
            setError(null); // Clear any previous errors
            
            
          } else {
            localStorage.setItem("authToken", responseData.token); // Save JWT to localStorage
            onLoginSuccess(responseData.token); // Call success callback
            onClose(); // Close modal
          }
        } else {
          // Handle case where response is empty
          setError("No response data received."); // Provide a user-friendly error
        }
      } else {
        // Try to parse error message if response is not OK
        const errorData = await response.json().catch(() => {
          return { message: "An unknown error occurred." }; // Handle parsing error
        });
        setError(errorData.message); // Set error message from the backend
        setPopupMessage(null);
      }
      
    } catch (error) {
      console.error("Fetch error:", error); // Log the error for debugging
      setError("An unexpected error occurred. Please try again."); // Set a user-friendly error message
    }
  };



  
  return (
    <ModalOverlay>
      <LoginModal>
        <RxCross2 onClick={onClose} />
        <CarouselContainer>
          <ArrowLeft onClick={handlePrevClick}>
            <IoIosArrowBack />
          </ArrowLeft>
          <CarouselImage src={images[currentImageIndex]} alt="Carousel Image" />
          <ArrowRight onClick={handleNextClick}>
            <IoIosArrowForward />
          </ArrowRight>
          <DotsContainer>
            {images.map((_, index) => (
              <Dot
                key={index}
                $isActive={currentImageIndex === index}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </DotsContainer>
        </CarouselContainer>

        {/* Login or Register Form */}
        <LoginForm onSubmit={handleSubmit}>
          <Title>{isRegister ? "Register Your Account" : "Enter Your Login Credentials"}</Title>
            <div>
            {error && <Error> {error}</Error>}
            {popupMessage && <Success>{popupMessage}</Success>}
              
              </div>          
          
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            required
          />
          {isRegister && (
            <Input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter User Type (buyer/seller)"
              required
            />
          )}
          <Button type="submit">{isRegister ? "Register" : "Login"}</Button>
          {/* Toggle between login and register */}
          {isRegister ? (
            <HasAccount onClick={() => setIsRegister(false)} >
              Already have an account? <strong>Login here</strong>
            </HasAccount>
          ) : (
            <HasAccount onClick={() => setIsRegister(true)} >
              Don't have an account? <strong>Register here</strong>
              </HasAccount>
          )}
        </LoginForm>
      </LoginModal>
    </ModalOverlay>
  );
};

export default Login;
