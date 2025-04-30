import { createContext, ReactNode, useContext, useState } from "react";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;
  selectedKeyword: string;
  setSelectedKeyword: (keyword: string) => void;
}

const FilterContext = createContext<undefined | FilterContextType>(undefined);

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedKeyword,
        setSelectedKeyword,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

export const UseFilterContext = () => {
  const context = useContext(FilterContext);

  if (!context) throw new Error("No context provided");

  return context;
};

export default FilterProvider;
