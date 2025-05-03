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


export type {ProductShape}