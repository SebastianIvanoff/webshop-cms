import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:7777/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      <div className="details-wrapper">
        <img
          className="product-img"
          src={product.imageURL}
          alt={product.name}
        />
        <h2>{product.name}</h2>
        <div className="details-container-2">
          <p>{product.description}</p>

          <p>{product.price} kr</p>

        </div>
          <div className="details-btns">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
      </div>
    </div>
  );
};

export default ProductDetails;
