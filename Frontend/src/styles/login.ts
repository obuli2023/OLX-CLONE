import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);  /* Semi-transparent black background */
    z-index: 1000;  /* Ensure it's behind the modal but above other content */
`;

export const LoginModal = styled.div`
    position: fixed;
    top: 0;  /* Start from the top of the page */
    left: 50%;
    transform: translateX(-50%);  /* Center horizontally */
    height: 100vh;  /* Full height of the viewport */
    width: 400px;  /* Set width for a vertical rectangle shape */
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 1000;  /* Ensure it stays above other content */
    overflow-y: auto;  /* Enable scroll if content overflows vertically */

    svg{
    position: absolute;
    cursor: pointer;
    top: 10px;   /* Align to the top */
    right: 10px;  /* Align to the right */
    font-size: 32px;
    }
`;

export const Title = styled.h1`
font-size: 20px;
color:#1E2952;

text-align: center;
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 20px; 
`;

export const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const Button = styled.button`
    padding: 10px;
    border: none;
    background: #1E2952;
    color: white;
    width:100px;
    margin-left:120px;
    justify-content:center;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
`;

export const Error = styled.p`
 color: red;
 margin-top:30px;
`;

export const Success = styled.p`
color:green;
margin-top:20px;
`;

export const HasAccount= styled.p`
margin-top:20px;
color:gray;
cursor: pointer;
font-size: 13px;

strong{
color:red;

&:Hover{
text-decoration: 1px underline;
}
}
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  margin-left:6px;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

export const ArrowLeft = styled.div`
  position: absolute;
  top: -70px;
  left: 50px;
  transform: translateY(-50%);
  font-size: 30px;
  color: grey;
  cursor: pointer;
`;

export const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 10px;
`;

export const CarouselImage = styled.img`
  margin-top: -120px;
  width: 80%;
  height: auto;
  object-fit: cover;
`;

export const DotsContainer = styled.div`
  position: absolute;
  bottom: -10px; /* Move the dots further down below the image */
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const Dot = styled.div<{ $isActive: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isActive ? "aqua" : "grey")};
  cursor: pointer;
`;