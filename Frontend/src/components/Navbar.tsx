import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  NavbarStyle,
  Logo,
  BoxContainer,
  Lens,
  Input,
  AllCategories,
  LocationList,
  EachLocation,
  SearchInput,
  SearchLogo,
  LoginButton,
  UserIcon,
  LogoutButton,
  Category,
  CategoryItem,
  PopularSearch,
  Banner,
  BannerImage,
  CategoryList,
  EachCategory,
  CategoryContainer,
  StyledArrowDown,
  StyledArrowUp,
  SuggestionsList,
  SuggestionItem,
} from "../styles/navbar"; // Include SuggestionsList, SuggestionItem styles.
import { CiLocationOn } from "react-icons/ci";

import olx from "../images/olx.png";
import lens from "../images/lens.png";
import search from "../images/search.png";

import Login from "./Login";
import { Product } from "../types/Product";


interface NavbarProps {
  onLoginClick: () => void;
  onLogoutClick :() => void;
  onLocationSelect: (filter: string) => void;
  onSearchResults: (results: Product[]) => void;
}

const Navbar = ({
  onLoginClick,
  onLocationSelect,
  onSearchResults,
}: NavbarProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeBox, setActiveBox] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [locations, setLocations] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [locationSelected, setLocationSelected] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [areSuggestionsVisible, setAreSuggestionsVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef(null); // Use ref to track the input element

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://localhost:7048/api/Product");
        if (!response.ok) throw new Error("Network response was not ok");
        const data: Product[] = await response.json();

        setProducts(data);

        // Extract unique locations and categories
        const uniqueLocations = [...new Set(data.map((item) => item.location))];
        setLocations(uniqueLocations);

        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchText.trim() !== "") {
      const filteredSuggestions = products
        .filter(
          (product) =>
            product.title.toLowerCase().includes(searchText.toLowerCase()) ||
            product.category.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => a.title.localeCompare(b.title));

      setSearchSuggestions(filteredSuggestions);
      setAreSuggestionsVisible(filteredSuggestions.length > 0); // Show suggestions if any are available
    } else {
      setSearchSuggestions([]);
      setAreSuggestionsVisible(false); // Hide suggestions if search text is empty
    }
  }, [searchText, products]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    // Populate suggestions based on the search text
    if (value) {
      const filteredSuggestions = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filteredSuggestions);
    } else {
      setSearchSuggestions([]);
    }
  };
  const searchInputRef = useRef<HTMLInputElement>(null);
  // Handle search when the icon is clicked
  const handleSearch = () => {
    if (!searchText.trim()) {
      return; // Do not proceed if searchText is empty
    }

    // Filter products by category based on the searchText
    const categoryRouteMap: { [key: string]: string } = {
      cars: "/cars",
      motorcycles: "/motorcycles",
      properties: "/properties",
      watches: "/watches",
      cameras: "/cameras",
      mobilephones: "/mobilephones",
    };

    const filteredProducts = products.filter(
      (product) => product.category.toLowerCase() === searchText.toLowerCase()
    );

    const category = searchText.toLowerCase();
    if (category in categoryRouteMap) {
      navigate(categoryRouteMap[category]);
      setSearchSuggestions([]); // Redirect to the category page
      onSearchResults(filteredProducts); // Pass filtered products to the parent
    } else {
      console.error("Unknown category:", category);
    }
  };

  // Handle clicking a suggestion
  const handleSuggestionClick = (suggestion: Product) => {
    setSearchSuggestions([]);

    setSearchText(suggestion.title);

    const category = suggestion.category.toLowerCase();
    const categoryRouteMap: { [key: string]: string } = {
      cars: "/cars",
      motorcycles: "/motorcycles",
      properties: "/properties",
      watches: "/watches",
      cameras: "/cameras",
      mobilephones: "/mobilephones",
    };

    if (category in categoryRouteMap) {
      navigate(categoryRouteMap[category], {
        state: { productId: suggestion.id },
      })
      setSearchText(suggestion.title); // Navigate to category with selected product ID
    
    } else {
      console.error("Unknown category:", category);
    }
  };

  // Filter locations based on input in the location box
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(selectedLocation.toLowerCase())
  );

  const dropDown = () => {
    setIsOpen((prev) => !prev);
    setActiveBox("location");
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  const handleFavoritesClick = () => {
    const token = localStorage.getItem("authToken"); // Check for token in local storage
    if (token) {
      navigate("/favoriteproducts"); // Navigate to favorites page if token exists
    } else {
      setLoginVisible(true); // Show login popup if no token
    }
  };

  const handleCloseLogin = () => {
    setLoginVisible(false);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("authToken");
    if(token) {
    localStorage.removeItem("authToken"); // Remove token from local storage
    alert("You have been logged out successfully, Login again to continue!")
    navigate("/");
    
    }
  };

  
  // Handle location selection, filter products based on location
  const handleLocationClick = (location: string) => {
    setSelectedLocation(location);
    const currentPath = window.location.pathname; // Get current path

    const filteredProductsByLocation = products.filter(
      (product) =>
        product.location === location &&
        (currentPath === "/" ||
          currentPath.includes(product.category.toLowerCase()))
    );

    onLocationSelect(location); // Call onLocationSelect with the selected location
    onSearchResults(filteredProductsByLocation); // Pass filtered products to parent component
    setLocationSelected(true);
  };

  // Close dropdown when location is selected
  useEffect(() => {
    if (locationSelected) {
      setIsOpen(false);
      setLocationSelected(false); // Reset the flag
    }
  }, [locationSelected]);

  const categoryRoutes: { [key: string]: string } = {
    cars: "/cars",
    mobilephones: "/mobilephones",
    properties: "/properties",
    watches: "/watches",
    motorcycles: "/motorcycles",
    cameras: "/cameras",
  };

  const handleCategoryClick = (category: string) => {
    setIsCategoryOpen(false);
    const categoryLower = category.toLowerCase();
    if (categoryRoutes[categoryLower]) {
      navigate(categoryRoutes[categoryLower]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveBox(null);
        setSelectedLocation("");
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setAreSuggestionsVisible(false);
        
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [locationRef, searchRef]);

  const isLoggedIn = localStorage.getItem('authToken') !== null;

  

  return (
    <>
      <NavbarStyle>
        <a href="/">
          <Logo src={olx} alt="OLX Logo" />
        </a>

        <BoxContainer
          $isActive={activeBox === "location"}
          onClick={dropDown}
          ref={locationRef}
        >
          <Lens src={lens} alt="search" />
          <Input
            type="text"
            placeholder="Select your location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)} // Update location as the user types
          />
          {isOpen ? (
            <StyledArrowUp onClick={dropDown} />
          ) : (
            <StyledArrowDown onClick={dropDown} />
          )}

          <LocationList $isOpen={isOpen}>
            {filteredLocations.map((location) => (
              <EachLocation
                key={location}
                onClick={() => handleLocationClick(location)} // Handle location click
              >
                <CiLocationOn />
                {location}
              </EachLocation>
            ))}
          </LocationList>
        </BoxContainer>

        <BoxContainer
          $isActive={activeBox === "search"}
          onClick={() => setActiveBox("search")}
          ref={searchInputRef}
        >
          <SearchInput
            type="text"
            placeholder="Find Cars, Mobile Phones..."
            value={searchText}
            onChange={handleInputChange}
            onFocus={() => setAreSuggestionsVisible(true)} // Show suggestions when focused
          />

          <SearchLogo src={search} onClick={handleSearch} />

          {areSuggestionsVisible && searchSuggestions.length > 0 && (
            <SuggestionsList>
              {searchSuggestions.map((suggestion) => (
                <SuggestionItem
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.title}
                </SuggestionItem>
              ))}
            </SuggestionsList>
          )}
        </BoxContainer>

        
      {isLoggedIn ? (
        <>
          <UserIcon/> 
          <LogoutButton onClick={handleLogout} >Logout</LogoutButton>
        </>
      ) : (
        <LoginButton onClick={onLoginClick} >Login</LoginButton>
      )}
    
      </NavbarStyle>

      <Category>
        <AllCategories href="/">All Categories</AllCategories>
        <div onClick={toggleCategoryDropdown}>
          {isCategoryOpen ? <StyledArrowUp /> : <StyledArrowDown />}
        </div>

        <CategoryContainer>
          {categories.map((category) => (
            <CategoryItem
              key={category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </CategoryItem>
          ))}
          <CategoryItem onClick={handleFavoritesClick}>
            Favorites
          </CategoryItem>
        </CategoryContainer>

        {isCategoryOpen && (
          <CategoryList>
            {categories.map((category) => (
              <EachCategory
                key={category}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </EachCategory>
            ))}
            <EachCategory onClick={handleFavoritesClick}>
              Favorites
            </EachCategory>
          </CategoryList>
        )}
      </Category>

      <PopularSearch>
        <h3>Popular Searches:</h3>
        <span>
          bike - cars - laptop - cycle - mobile - iphone - tractor - scooty -
          shoes - books - washing machine
        </span>
      </PopularSearch>

      <Banner>
        <BannerImage
          href="https://www.amazon.in/b?node=1389401031&ref=wave23olxopswl&tag=amzwave23olxopswl1-21"
          target="_blank"
        >
          <img
            src="https://tpc.googlesyndication.com/simgad/12083559888999686570"
            alt="Amazon Festival Sales"
          />
        </BannerImage>
      </Banner>
      {isLoginVisible && <Login onClose={handleCloseLogin} onLoginSuccess={()=>{}} />}
    </>
  );
};

export default Navbar;
