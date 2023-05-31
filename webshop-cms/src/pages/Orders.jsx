import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:7777/api/orders/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        if (data) {
          setOrders(data);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [token]);

  return (
    <div className="order-container">
      {orders.map((order) => (
        <div className="orders" key={order._id}>
          <p className="order-text">
            Order Number: 
            <span>{order._id}</span>
          </p>
          <p className="order-text">
            User ID: 
            <span>{order.user}</span>
          </p>
          <p className="order-text">
            Order status: 
            <span>{order.status.status}</span>
          </p>
          <Link className="details-link" to={`/orders/${order._id}`}>
            Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Orders;
