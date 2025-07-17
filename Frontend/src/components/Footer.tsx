
import { 
  FooterContainer, FooterSection, FooterTitle, 
  FooterLink, SocialIconWrapper, FooterBottomContainer, 
  LogosContainer, FooterBottomText, FooterLinks, 
  RightsText 
} from '../styles/home'; // Adjust the import based on your styles
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import cartradelogo from '../images/cartradelogo.png';
import olxfooterlogo from '../images/olxfooterlogo.png';
import carwalelogo from '../images/carwalelogo.png';
import bikewalelogo from '../images/bikewale.png';
import mobilitylogo from '../images/mobilitylogo.png';

const Footer = () => {
  return (
    <>
      <FooterContainer>
        {/* Footer sections */}
        <FooterSection>
          <FooterTitle>Popular Locations</FooterTitle>
          <FooterLink>Kolkata</FooterLink>
          <FooterLink>Mumbai</FooterLink>
          <FooterLink>Chennai</FooterLink>
          <FooterLink>Pune</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Trending Locations</FooterTitle>
          <FooterLink>Bhubaneshwar</FooterLink>
          <FooterLink>Hyderabad</FooterLink>
          <FooterLink>Chandigarh</FooterLink>
          <FooterLink>Nashik</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterLink href="https://tech.olx.in/">Tech@OLX</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>OLX</FooterTitle>
          <FooterLink href="https://www.olx.in/blog">Blog</FooterLink>
          <FooterLink href="https://help.olx.in/hc/en-us">Help</FooterLink>
          <FooterLink href="https://www.olx.in/en-in/sitemap/most-popular">Sitemap</FooterLink>
          <FooterLink href="https://help.olx.in/hc/en-us/categories/10781706981149-Legal-Privacy-information">Legal & Privacy information</FooterLink>
          <FooterLink href="https://bugbase.ai/programs/olx">Vulnerability Disclosure Program</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Follow Us</FooterTitle>
          <SocialIconWrapper>
            <FaFacebookF href="https://www.facebook.com/olxindia/"/>
            <FaInstagram href="https://www.instagram.com/olx_india/" />
            <FaTwitter href="https://x.com/OLX_India?mx=2" />
          </SocialIconWrapper>
        </FooterSection>
      </FooterContainer>

      <FooterBottomContainer>
        <LogosContainer>
          <a href="https://www.cartrade.com" target="_blank" rel="noopener noreferrer">
            <img src={cartradelogo} alt="CarTradeTech Group" />
          </a>
          <a href="https://www.olx.in" target="_blank" rel="noopener noreferrer">
            <img src={olxfooterlogo} alt="OLX" />
          </a>
          <a href="https://www.carwale.com" target="_blank" rel="noopener noreferrer">
            <img src={carwalelogo} alt="CarWale" />
          </a>
          <a href="https://www.bikewale.com" target="_blank" rel="noopener noreferrer">
            <img src={bikewalelogo} alt="BikeWale" />
          </a>
          <a href="https://www.mobility.com" target="_blank" rel="noopener noreferrer">
            <img src={mobilitylogo} alt="Mobility" />
          </a>
        </LogosContainer>
        <FooterBottomText>
          <FooterLinks href="https://www.olx.in/en-in/sitemap/most-popular">Help-Sitemap</FooterLinks>
          <RightsText>All rights reserved © 2006-2024 OLX-CLONE</RightsText>
        </FooterBottomText>
      </FooterBottomContainer>
    </>
  );
};

export default Footer;


