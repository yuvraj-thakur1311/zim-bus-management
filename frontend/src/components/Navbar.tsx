import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Bus Booking</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/searchForm">Search</Link></li>
        <li><Link to="/busList">Buses</Link></li>
        <li><Link to="/bookingForm">Booking</Link></li>
        <li><Link to="/confirmation">Confirmation</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
