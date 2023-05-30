import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

const Login = () => {
  const { updateToken } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Send a POST request to login with admin privileges
      const res = await axios.post("http://localhost:7777/api/users/admin", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      updateToken(data.token);
      // Navigate to the home page 
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="form-group" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label htmlFor="userName" className="form-label">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-control"
            value={loginData.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button className="form-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
