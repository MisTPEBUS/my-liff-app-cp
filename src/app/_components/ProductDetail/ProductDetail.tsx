"use client";

interface ProductDetailProps {
  id: string;
}

const ProductDetail = ({ id }: ProductDetailProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold">Details for ID: {id}</h2>
      <pre className="bg-gray-100 p-2 rounded"></pre>
    </div>
  );
};

export default ProductDetail;
