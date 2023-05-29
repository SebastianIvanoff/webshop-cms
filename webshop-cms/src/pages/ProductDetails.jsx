import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

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

  const deleteBtn = async () => {
    const res = await fetch(`http://localhost:7777/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });
  
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      navigate('/')
      // Handle successful deletion, e.g., redirect or show a success message
    } else {
      // Handle error if the deletion was not successful
      const errorData = await res.json();
      console.log(errorData);
    }
  };
  

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
            <button className="delete-btn" onClick={deleteBtn}>Delete</button>
          </div>
      </div>
    </div>
  );
};

export default ProductDetails;
