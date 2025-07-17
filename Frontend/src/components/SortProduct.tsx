import { useState } from 'react';
import { Product } from '../types/Product';
import { SortContainer, SortLabel, DropdownButton, OptionsList, DropdownItem } from '../styles/sortproduct';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; // Import icons

interface SortProductsProps {
  products: Product[];
  setFilteredProducts: (sortedProducts: Product[]) => void;
}

const SortProducts = ({ products, setFilteredProducts }: SortProductsProps) => {
  const [sortOption, setSortOption] = useState<string>('Select an option');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSortChange = (selectedOption: string) => {
    setSortOption(selectedOption);

    let sortedProducts = [...products];

    // Sorting logic based on selected option
    if (selectedOption === 'Price: High To Low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (selectedOption === 'Price: Low To High') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedOption === 'Condition: New') {
      sortedProducts = sortedProducts.filter((product) => product.condition.toLowerCase() === 'new');
    } else if (selectedOption === 'Condition: Used') {
      sortedProducts = sortedProducts.filter((product) => product.condition.toLowerCase() === 'used');
    } else if (selectedOption === 'Recently Posted') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      sortedProducts = sortedProducts.filter((product) => {
        if (product.datePosted) {
          return new Date(product.datePosted) >= oneMonthAgo;
        }
        return false;
      });
    }

    // Update the filtered products with the sorted/filtered results
    setFilteredProducts(sortedProducts);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <SortContainer>
      <SortLabel>SORT BY:</SortLabel>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {sortOption} {/* Display the selected option directly */}
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />} {/* Conditional rendering for arrows */}
      </DropdownButton>
      {isOpen && (
        <OptionsList>
          <DropdownItem onClick={() => handleSortChange('Select an Option')}>Select an option</DropdownItem>
          <DropdownItem onClick={() => handleSortChange('Price: High To Low')}>Price: High to Low</DropdownItem>
          <DropdownItem onClick={() => handleSortChange('Price: Low To High')}>Price: Low to High</DropdownItem>
          <DropdownItem onClick={() => handleSortChange('Condition: New')}>Condition: New</DropdownItem>
          <DropdownItem onClick={() => handleSortChange('Condition: Used')}>Condition: Used</DropdownItem>
          <DropdownItem onClick={() => handleSortChange('Recently Posted')}>Recently Posted</DropdownItem>
        </OptionsList>
      )}
    </SortContainer>
  );
};

export default SortProducts;
