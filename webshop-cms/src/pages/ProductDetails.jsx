import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [updatedPrice, setUpdatedPrice] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:7777/api/products/${id}`);
        const data = res.data;
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [id]);

  const deleteBtn = async () => {
    try {
      const res = await axios.delete(`http://localhost:7777/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: product,
      });
  
      if (res.status === 200) {
        const data = res.data;
        console.log(data);
        navigate("/");
        // Handle successful deletion, e.g., redirect or show a success message
      } 
    } catch (error) {
      // Handle error if the deletion was not successful
      console.error(error);
    }
  };
  const editBtn = () => {
    setIsEditClicked(true);
  };

  const updateBtn = async () => {
    try {
      const res = await axios.put(`http://localhost:7777/api/products/${id}`, { price: updatedPrice }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 200) {
        const data = res.data;
        console.log(data);
        navigate(`/`);
       
      } 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="details-container">
      <div className="details-wrapper">
        <img className="product-img" src={product?.imageURL} alt={product?.name} />
        <h2>{product?.name}</h2>
        <div className="details-container-2">
          <p>{product?.description}</p>
          <p>{product?.price} kr</p>
        </div>
        <div className="details-btns">
          <button className="edit-btn" onClick={editBtn}>
            Update price
          </button>
          <button className="delete-btn" onClick={deleteBtn}>
            Delete
          </button>
        </div>
        <div className="edit-container">
           {isEditClicked && (
          <div className="form-group">
            <input
              type="number"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
              placeholder="Enter new price"
              className="form-control"
            />
            <div className="details-btns">
              <button className="edit-btn" onClick={updateBtn}>
              Update
            </button>
            </div>
            
          </div>
        )}
        </div>
       
      </div>
    </div>
  );
  
};

export default ProductDetails;
