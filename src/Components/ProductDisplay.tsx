import { useEffect, useState } from "react";
import { UseFilterContext } from "../Context/FilterContext";
import { Tally3 } from "lucide-react";
import Capitalise from "../Utils/Capitalise";
import axios from "axios";

type dimensionsShape = {
  width: number;
  height: number;
  depth: number;
};

type metaShape = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

type reviewShape = {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};

type ProductShape = {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: dimensionsShape;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: metaShape;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: reviewShape;
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
};

const ProductDisplay = () => {
  const [products, setProducts] = useState<ProductShape[]>([]);

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropped, setIsDropped] = useState(false);

  const itemsPerPage = 12;

  const { searchQuery, selectedCategory, selectedKeyword, minPrice, maxPrice } =
    UseFilterContext();

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

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      const searchQueryLower = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter((product) => {
        const { title, brand, category, } = product;
        return (
          title.toLowerCase().includes(searchQueryLower) ||
          brand.toLowerCase().includes(searchQueryLower) ||
          category.toLowerCase().includes(searchQueryLower)
        );
      });
    }

    console.log(filteredProducts);
  };

  getFilteredProducts();

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-4">
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-5 relative">
            <button
              onClick={() => setIsDropped(!isDropped)}
              className="p-2 rounded-full flex items-center">
              <Tally3 viewBox="-3 0 24 24" className="mr-2" />
              {filter === "all" ? "Filter" : Capitalise(filter)}
            </button>
            {isDropped && (
              <div className="absolute bg-white border border-gray-300 rounded w-full">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block cursor-pointer px-4 py-2 w-full text-left hover:bg-gray-200">
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block cursor-pointer px-4 py-2 w-full text-left hover:bg-gray-200">
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block cursor-pointer px-4 py-2 w-full text-left hover:bg-gray-200">
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-4"></div>
      </div>
    </section>
  );
};

export default ProductDisplay;
