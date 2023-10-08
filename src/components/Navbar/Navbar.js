import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar1">
      <div>
        <h2>User Dashboard</h2>{" "}
      </div>
      <Link to="/create" className="btn btn-primary">
        Add +
      </Link>
    </div>
  );
};

export default Navbar;
