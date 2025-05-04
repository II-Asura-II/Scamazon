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
      <div className="p-4">
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
            <div className="font-semibold">
              <p className="text-[1.5rem] font-bold">{product.title}</p>
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
              <p>
                Brand: <span className="font-normal">{product.brand}</span>
              </p>
              <p>
                About this item:
                <br />{" "}
                <span className="font-normal">{product.description}</span>
              </p>
              <p className="font-normal">
                Height: {product.dimensions.height} | Width:
                {product.dimensions.width} | Depth:{product.dimensions.width} |
                Weight: {product.weight}
              </p>
              <p></p>
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
