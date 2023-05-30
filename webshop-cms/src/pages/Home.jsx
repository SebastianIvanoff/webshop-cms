import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  //If there is no token the redirect to the login page
  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:7777/api/products/");
        const data = res.data;
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="products" key={product._id}>
          <img
            className="product-img"
            src={product.imageURL}
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p>{product.price} kr</p>
          <Link className="link-details" to={`/products/${product._id}`}>
            Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
