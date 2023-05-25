import { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

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
    const res = await fetch("http://localhost:7777/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await res.json();
    console.log(data);
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
