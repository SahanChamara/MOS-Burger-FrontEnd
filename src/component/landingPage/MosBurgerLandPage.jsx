import React from "react";
import './MosBurgerLandPage.css';

import { useNavigate } from "react-router-dom";

const MosBurgerLandPage = () => {
    
    const navigate = useNavigate();

  return (
    <div>
      <div className="land-page-body">
        <header className="land-page-header">
          <div className="land-page-logo">
            MOS BURGERS
          </div>
          <nav>
            <ul className="land-page-nav-links">
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
          <button className="land-page-btn-cashier" onClick={() => {navigate("/")}}>Logout</button>
        </header>

        <section className="land-page-hero">
          <div className="land-page-hero-content">
            <h1 className="land-page-hero-text">
              FRESH.
              <br /> BOLD <br />
              TASTY.
            </h1>
            <p className="land-page-hero-subtext">
              You will be amazed - and yes, we do vegan too.
            </p>

            <div className="land-page-action-buttons">
              <div className="land-page-action-button" onClick={() => navigate('/placeOrder')}>                
                <i className="land-page-fas fa-cart-shopping"></i>
                <h3>Order Processing</h3>
                <p>Manage customer orders</p>
              </div>
              <div
                className="land-page-action-button"  onClick={() => navigate('/stock')}>
                <i className="land-page-fas fa-store"></i>
                <h3>Store Management</h3>
                <p>Control inventory & settings</p>
              </div>
              <div
                className="land-page-action-button" >
                <i className="land-page-fas fa-users"></i>
                <h3>Customer Management</h3>
                <p>Handle customer data</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MosBurgerLandPage;
