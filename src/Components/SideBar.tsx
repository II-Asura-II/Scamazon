import { useEffect, useState } from "react";

interface Product {
  category: string;
}

interface ResponseShape {
  products: Product[];
}

const SideBar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  const Capitalise = (word: string): string => {
    return (
      word.charAt(0).toUpperCase() + word.slice(1, word.length).toLowerCase()
    );
  };

  useEffect(() => {
    const fetchCategorycategory = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: ResponseShape = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorycategory();
  }, []);

  return (
    <div className="text-sm fixed w-[25%] flex flex-col h-screen left-0 items-center">
      <h1 className="font-bold text-2xl mb-4 text-shadow-md pt-4">Scamazon</h1>
      <section className="flex flex-col gap-y-6">
        <section className="flex flex-col gap-y-2 px-4">
          <input
            className="py-1 px-2 border-1 focus:outline-none rounded-sm flex flex-1"
            type="text"
            placeholder="Search Product"
          />
          <div className="flex gap-x-2">
            <input
              className="py-1 px-2 border-1 focus:outline-none rounded-sm w-1/2"
              type="text"
              placeholder="Min"
            />
            <input
              className="py-1 px-2 border-1 focus:outline-none rounded-sm w-1/2"
              type="text"
              placeholder="Max"
            />
          </div>
        </section>
        <section className="flex flex-col px-4">
          <h2 className="font-semibold text-xl text-center mb-2">Categories</h2>

          <section>
            {categories.map((category, i) => (
              <label
                className="flex items-center gap-x-2 cursor-pointer py-1"
                key={i}>
                <input
                  className="size-4"
                  type="radio"
                  name="category"
                  id="category"
                  value={category}
                />{" "}
                <span>{Capitalise(category)}</span>
              </label>
            ))}
          </section>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-center">Keywords</h2>
          <section className="flex flex-col">
            {keywords.map((keyword, i) => (
              <button
                className="flex px-4 py-2 transition-transform hover:scale-105 duration-200 cursor-pointer hover:bg-gray-200"
                key={i}>
                {Capitalise(keyword)}
              </button>
            ))}
          </section>
        </section>
        <section className="flex flex-1 px-4">
          <button className="bg-black text-white flex-1 py-2 rounded-sm hover:scale-105 active:scale-100 transition-transform duration-200">
            Reset Filters
          </button>
        </section>
      </section>
    </div>
  );
};

export default SideBar;
