import { Link } from "react-router-dom";
import { ProductShape } from "../Types/ProductsType";

const ProductCard = ({ product }: { product: ProductShape }) => {
  return (
    <div className="w-60 px-4 h-65 flex flex-col mx-auto items-center justify-between">
      <div>
        <Link
          className="cursor-pointer flex flex-col items-center"
          to={`/product/${product.id}`}>
          <img
            className="object-cover w-35"
            src={product.thumbnail}
            alt={product.title}
          />
          <h1 className="text-sm">{product.title}</h1>
        </Link>
      </div>
      <div className="flex flex-col text-xs gap-2 w-full">
        <button className="cursor-pointer bg-black text-white rounded-sm py-2">
          Buy Now
        </button>
        <button className="cursor-pointer border-1 border-black py-2 rounded-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
