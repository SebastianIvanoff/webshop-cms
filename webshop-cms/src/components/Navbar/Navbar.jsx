import { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ title }) => {
  const { updateToken, token } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    updateToken(null);
    navigate("/login");
  };

  console.log(token);

  const isLoginPage = location.pathname === "/login";

  return (
    <nav className="navbar">
      <h1 className="title">{title}</h1>

      {!isLoginPage && (
        <ul className="nav-list">
          <li>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="orders">
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/add">
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/login" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
