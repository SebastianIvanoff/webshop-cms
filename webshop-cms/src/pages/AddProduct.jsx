import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    imageURL: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductData((form) => {
      return {
        ...form,
        [id]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
// Sending a POST request to the  API endpoint with the 'productData'
    try {
      const res = await axios.post(
        "http://localhost:7777/api/products/",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        const data = res.data;
        console.log(data);
        navigate("/");
      } else {
        const errorData = res.data;
        console.log(errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //If there is no token the redirect to the login page
  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  });

  return (
    <div className="product-form">
      <form className="form-group" onSubmit={handleSubmit}>
        <h1>Add a product</h1>
        <div>
          <label htmlFor="name" className="form-label">
            Name of the product
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={productData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price" className="form-label">
            Price of the product
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={productData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="imageURL" className="form-label">
            Image of the product
          </label>
          <input
            type="text"
            id="imageURL"
            className="form-control"
            value={productData.imageURL}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="form-label">
            Description of the product
          </label>
          <textarea
            type="number"
            id="description"
            className="form-control"
            value={productData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="form-btn">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
