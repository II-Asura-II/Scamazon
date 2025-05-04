import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductShape } from "../Types/ProductsType";
import axios from "axios";
import { ArrowLeft, Star, StarHalf } from "lucide-react";
import ProductImageCarousel from "./ProductImageCarousel";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  const nav = useNavigate();

  const [product, setProduct] = useState<ProductShape | null>(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      <div className="py-4 px-8 h-screen">
        <div onClick={() => nav(-1)}>
          <ArrowLeft />
        </div>
        {product ? (
          <div className="">
            {product.images.length > 1 ? (
              <ProductImageCarousel
                images={product.images}
                alt={product.title}
              />
            ) : (
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-80"
              />
            )}
            <div className="font-semibold h-70 justify-between flex flex-col">
              <div className="flex justify-between">
                <div>
                  <p className="text-[1.5rem] font-bold">{product.title}</p>
                  <p>
                    Brand: <span className="font-normal">{product.brand}</span>
                  </p>
                  <div className="flex items-center">
                    <p className="font-normal text-sm mr-2">{product.rating}</p>
                    {Array.from({ length: Math.floor(product.rating) }).map(
                      (_, i) => (
                        <Star key={i} color="gold" size={16} fill="gold" />
                      )
                    )}
                    {Math.trunc(product.rating) && (
                      <StarHalf size={16} fill="gold" color="gold" />
                    )}
                    <p className="ml-4 text-sm font-normal text-green-500">
                      {product.reviews.length} Reviews
                    </p>
                  </div>
                  <p className="text-xl">
                    ${product.price}
                    <span className="text-xs text-gray-700">
                      {" "}
                      -{product.discountPercentage}%
                    </span>
                  </p>
                  <p className="text-sm">
                    List price:{" "}
                    <span className="line-through text-red-400">
                      $
                      {(
                        product.price +
                        product.price * (product.discountPercentage / 100)
                      ).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 font-normal">
                    {product.shippingInformation}
                  </p>
                </div>
                <div className="space-x-4">
                  <button className="cursor-pointer bg-black text-white rounded-sm py-2 w-25">
                    Buy Now
                  </button>
                  <button className="cursor-pointer border-1 border-black py-2 rounded-sm w-25">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="flex gap-x-3">
                {product.tags.map((tag, i) => (
                  <span className="border-1 rounded-sm p-2 cursor-pointer text-xs" key={i}>
                    {tag}
                  </span>
               ) )}
              </div>
              <div>
                <p>
                  About this item:
                  <br />{" "}
                  <span className="font-normal">{product.description}</span>
                </p>
                <p className="font-normal">
                  Height: {product.dimensions.height} | Width:
                  {product.dimensions.width} | Depth:{product.dimensions.width}{" "}
                  | Weight: {product.weight}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
