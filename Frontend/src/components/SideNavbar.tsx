import { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import {
  SidebarContainer,
  Title,
  FilterSection,
  FilterTitle,
  FilterItem,
  CheckboxLabel,
  DateFilter,
  ArrowContainer,
  ArrowUp,
  ArrowDown
} from '../styles/sidenavbar'; 

import { Product } from "../types/Product";

interface SideNavbarProps {
  products: Product[];
  setFilteredProducts: (filtered: Product[]) => void;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ products, setFilteredProducts }) => {
  const [selectedFilters, setSelectedFilters] = useState<{
    location: Set<string>;
    price: Set<string>;
    brand: Set<string>;
    date: Set<string>;
  }>({
    location: new Set<string>(),
    price: new Set<string>(),
    brand: new Set<string>(),
    date: new Set<string>(),
  });

  const [filters, setFilters] = useState<{
    locations: string[];
    priceRanges: string[];
    brands: string[];
    dates: string[];
  }>({
    locations: [],
    priceRanges: [],
    brands: [],
    dates: [],
  });

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      const uniqueBrands = Array.from(new Set(products.map((item) => item.brand)));
      const uniqueLocations = Array.from(new Set(products.map((item) => item.location)));
      const uniquePrices = Array.from(new Set(products.map((item) => item.price.toString())));

      const dateNow = new Date();
      const formattedDates = products.map((item) => {
        if (!item.datePosted) return 'Unknown Date';
        const datePosted = new Date(item.datePosted);
        const diffTime = Math.abs(dateNow.getTime() - datePosted.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) return 'Within one week';
        else if (diffDays <= 30) return 'Within one month';
        else if (diffDays <= 365) return 'Within one year';
        return 'More than one year';
      });
      const uniqueFormattedDates = Array.from(new Set(formattedDates));

      setFilters({
        locations: uniqueLocations,
        priceRanges: uniquePrices,
        brands: uniqueBrands,
        dates: uniqueFormattedDates,
      });
    };

    fetchFilters();
  }, [products]);

  const handleLocationClick = (location: string) => {
    const updatedSet = new Set(selectedFilters.location);
    if (updatedSet.has(location)) {
      updatedSet.delete(location);
    } else {
      updatedSet.add(location);
    }
    setSelectedFilters(prev => ({ ...prev, location: updatedSet }));
    filterProducts(products, { ...selectedFilters, location: updatedSet });
  };

  const handlePriceClick = (price: string) => {
    const updatedSet = new Set(selectedFilters.price);
    if (updatedSet.has(price)) {
      updatedSet.delete(price);
    } else {
      updatedSet.add(price);
    }
    setSelectedFilters(prev => ({ ...prev, price: updatedSet }));
    filterProducts(products, { ...selectedFilters, price: updatedSet });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setSelectedFilters(prev => {
      const updatedSet = new Set(prev[name as keyof typeof selectedFilters]);
      if (checked) {
        updatedSet.add(value);
      } else {
        updatedSet.delete(value);
      }

      const newFilters = {
        ...prev,
        [name]: updatedSet,
      };

      filterProducts(products, newFilters);
      return newFilters;
    });
  };

  const filterProducts = (products: Product[], filters: typeof selectedFilters) => {
    let filtered = products;

    if (filters.location.size > 0) {
      filtered = filtered.filter(product => filters.location.has(product.location));
    }
    if (filters.price.size > 0) {
      filtered = filtered.filter(product => filters.price.has(product.price.toString()));
    }
    if (filters.brand.size > 0) {
      filtered = filtered.filter(product => filters.brand.has(product.brand));
    }
    if (filters.date.size > 0) {
      filtered = filtered.filter(product => {
        const datePosted = new Date(product.datePosted || '');
        const dateNow = new Date();
        const diffTime = Math.abs(dateNow.getTime() - datePosted.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (filters.date.has('Within one week') && diffDays <= 7) return true;
        if (filters.date.has('Within one month') && diffDays <= 30) return true;
        if (filters.date.has('Within one year') && diffDays <= 365) return true;
        if (filters.date.has('More than one year') && diffDays > 365) return true;
        return false;
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <SidebarContainer>

      {/* Location Filter */}
<FilterSection>
  <FilterTitle onClick={() => setIsLocationOpen(!isLocationOpen)}>
    Locations
    <ArrowContainer>
      {isLocationOpen ? <ArrowUp /> : <ArrowDown />}
    </ArrowContainer>
  </FilterTitle>
  {isLocationOpen && filters.locations.map((location) => (
    <FilterItem
      key={location}
      isActive={selectedFilters.location.has(location)}
      onClick={() => handleLocationClick(location)}
    >
      <span>{location}</span>
    </FilterItem>
  ))}
</FilterSection>
<hr />

{/* Price Filter */}
<FilterSection>
  <FilterTitle onClick={() => setIsPriceOpen(!isPriceOpen)}>
    Price
    <ArrowContainer>
      {isPriceOpen ? <ArrowUp /> : <ArrowDown />}
    </ArrowContainer>
  </FilterTitle>
  {isPriceOpen && filters.priceRanges.map((price) => (
    <FilterItem
      key={price}
      isActive={selectedFilters.price.has(price)}
      onClick={() => handlePriceClick(price)}
    >
      <span>{`₹${price}`}</span>
    </FilterItem>
  ))}
</FilterSection>
<hr />

{/* Brand Filter */}
<FilterSection>
  <FilterTitle onClick={() => setIsBrandOpen(!isBrandOpen)}>
    Brand
    <ArrowContainer>
      {isBrandOpen ? <ArrowUp /> : <ArrowDown />}
    </ArrowContainer>
  </FilterTitle>
  {isBrandOpen && filters.brands.map((brand) => (
    <FilterItem key={brand} isActive={selectedFilters.brand.has(brand)}>
      <CheckboxLabel>
        <input
          type="checkbox"
          name="brand"
          value={brand}
          onChange={(e) => handleCheckboxChange(e)}
        />
        <span>{brand}</span>
      </CheckboxLabel>
    </FilterItem>
  ))}
</FilterSection>
<hr />

{/* Date Filter */}
<DateFilter>
  <FilterTitle onClick={() => setIsDateOpen(!isDateOpen)}>
    Date Posted
    <ArrowContainer>
      {isDateOpen ? <ArrowUp /> : <ArrowDown />}
    </ArrowContainer>
  </FilterTitle>
  {isDateOpen && filters.dates.map((dateValue, index) => (
    <FilterItem key={index} isActive={selectedFilters.date.has(dateValue)}>
      <CheckboxLabel>
        <input
          type="checkbox"
          name="date"
          value={dateValue}
          onChange={(e) => handleCheckboxChange(e)}
        />
        <span>{dateValue}</span>
      </CheckboxLabel>
    </FilterItem>
  ))}
</DateFilter>

    </SidebarContainer>
  );
};

export default SideNavbar;
