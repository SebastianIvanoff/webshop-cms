
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-title">
        <h1 className="title">Fruits-CMS</h1>
      </Link>
      <ul className="nav-list">
        <li>
          <NavLink className="nav-link" to="/add">
            Add Product
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/Login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
