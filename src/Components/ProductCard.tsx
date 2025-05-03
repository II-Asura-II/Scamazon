import { Link } from "react-router-dom";
import { ProductShape } from "../Types/ProductsType";

const ProductCard = ({ product }: { product: ProductShape }) => {
  return (
    <div className="flex items-center justify-center w-35 p-2">
      <Link
        className="flex items-center flex-col"
        to={`/product/${product.id}`}>
        <img
          className="object-cover"
          src={product.thumbnail}
          alt={product.title}
        />
        <h1 className="text-sm">{product.title}</h1>
      </Link>
    </div>
  );
};

export default ProductCard;
