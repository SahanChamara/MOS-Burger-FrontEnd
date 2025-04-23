import React from "react";
import "./MosBurgerNavBar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

  return (
    <div>
      <header className="nav-header">
        <div className="nav-logo"></div>
        <nav>
          <ul className="nav-nav-links">
            <li>              
              <p onClick={()=> navigate('/home')}>Home</p>
            </li>
            <li>
            <p onClick={()=> navigate('/stock')}>Stock Management</p>
            </li>
            <li>
            <p onClick={()=> navigate('/placeOrder')}>Place Order</p>
            </li>
            <li>
            <p onClick={()=> navigate('/customer')}>Customer Management</p>
            </li>
          </ul>
        </nav>
        <button className="nav-btn-cashier" onClick={() => {navigate("/")}}>Logout</button>
      </header>
    </div>
  );
};

export default Navbar;
