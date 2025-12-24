import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">BMS</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/searchForm">Search</Link></li>
        <li><Link to="/busList">Buses</Link></li>
        <li><Link to="/bookingForm">Booking</Link></li>
        <li><Link to="/confirmation">My Bookings</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;