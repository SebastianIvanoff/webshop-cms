import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:7777/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setOrder(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, token]);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:7777/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async () => {
    try {
      const response = await axios.put(
        `http://localhost:7777/api/orders/${id}`,
        { status: parseInt(status) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        if (data) {
          fetchOrder();
        }
      } else {
        console.log("Error updating order status");
      }
    } catch (error) {
      console.log("Error updating order status", error);
    }
  };

  return (
    <div className="order-container">
      <div className="orders" key={order._id}>
        <h1>Order Details</h1>

        <h3 className="order-text">
          Order Number: <span>{order._id}</span>
        </h3>
        <h3 className="order-text">
          user ID: <span>{order.user}</span>
        </h3>
        <h3 className="order-text">
          Order Status: <span>{order.status && order.status.status}</span>
        </h3>
        {order.orderRows &&
          order.orderRows.map((orderRow) => (
            <div className="order-Info" key={orderRow._id}>
              <p>
                {orderRow.quantity} {orderRow.product.name}s at {orderRow.product.price} kr
              </p>
            </div>
          ))}

        <div className="order-status">
          <label htmlFor="status">Status: </label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">-- Status --</option>
            <option value="1"> Pending</option>
            <option value="2"> In Transit</option>
            <option value="3"> Delivered</option>
          </select>
          <button onClick={handleStatusChange} className="status-btn">Update Status</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
