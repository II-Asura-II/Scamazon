import { useEffect, useRef, useState } from "react";
import { UseFilterContext } from "../Context/FilterContext";
import { ChevronLeft, ChevronRight, Dot, Filter, SearchX } from "lucide-react";
import Capitalise from "../Utils/Capitalise";
import axios from "axios";
import ProductCard from "./ProductCard";
import { ProductShape } from "../Types/ProductsType";

const ProductDisplay = () => {
  const [products, setProducts] = useState<ProductShape[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropped, setIsDropped] = useState(false);
  const itemsPerPage = 15;
  const { searchQuery, selectedCategory, selectedKeyword, minPrice, maxPrice } =
    UseFilterContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropped(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = `https://dummyjson.com/products/?limit=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
      }`;

      if (selectedKeyword) {
        url = `https://dummyjson.com/products/search?q=${selectedKeyword}`;
      }
      axios
        .get(url)
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((error) => console.error(error));
    };

    fetchProducts();
  }, [currentPage, selectedKeyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (minPrice && maxPrice && minPrice < maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    } else if (!minPrice && maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      const searchQueryLower = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter((product) => {
        const { title, brand, category } = product;

        const t = title === undefined ? "" : title;
        const b = brand === undefined ? "" : brand;
        const c = category === undefined ? "" : category;

        return (
          t.toLowerCase().includes(searchQueryLower) ||
          b.toLowerCase().includes(searchQueryLower) ||
          c.toLowerCase().includes(searchQueryLower)
        );
      });
    }

    switch (filter) {
      case "cheap":
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "all":
        filteredProducts = filteredProducts.sort((a, b) => a.id - b.id);
        break;
      default:
        return filteredProducts;
    }

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="w-full h-full justify-between p-4 flex flex-col">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative w-30" ref={dropdownRef}>
            <button
              onClick={() => setIsDropped(!isDropped)}
              className="p-2 rounded-full flex items-center">
              <Filter size={20} className="mr-1" />
              {filter === "all" ? "Filter" : Capitalise(filter)}
            </button>
            {isDropped && (
              <div className="absolute bg-white border border-gray-300 rounded w-full">
                <button
                  onClick={() =>
                    filter === "cheap" ? setFilter("all") : setFilter("cheap")
                  }
                  className="h-10 flex items-center justify-between cursor-pointer pl-2 w-full hover:bg-gray-200">
                  Cheap {filter === "cheap" && <Dot size={30} />}
                </button>
                <button
                  onClick={() =>
                    filter === "expensive"
                      ? setFilter("all")
                      : setFilter("expensive")
                  }
                  className="h-10 flex items-center justify-between cursor-pointer pl-2 w-full hover:bg-gray-200">
                  Expensive {filter === "expensive" && <Dot size={30} />}
                </button>
                <button
                  onClick={() =>
                    filter === "popular"
                      ? setFilter("all")
                      : setFilter("popular")
                  }
                  className="flex items-center justify-between cursor-pointer pl-2 h-10 w-full hover:bg-gray-200">
                  Popular {filter === "popular" && <Dot size={30} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full h-full items-baseline mt-2">
        <div className="w-full grid lg:grid-cols-5 md:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="flex items-center gap-x-2">
              <SearchX size={18} /> No results
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
          <ChevronLeft />
        </button>
        <p>{currentPage}</p>
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default ProductDisplay;
