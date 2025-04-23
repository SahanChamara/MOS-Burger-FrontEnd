import React, {useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./Invoice.css";

const Invoice = ({ orderDetails, onClose }) => {
    const invoiceRef = useRef();
  
    const handlePrint = useReactToPrint({
      content: () => invoiceRef.current,
    });

/*     const handlePrint = () => {
        window.print();
    } */
  
    return (
      <div className="invoice-popup">
        <div ref={invoiceRef} className="invoice">
          <h2>MOS Burger Invoice</h2>
          {/* <p>Order ID: {orderDetails.orderId}</p> */}
          <p>Customer: {orderDetails.customer.name}</p>
          <p>Total Amount: Rs. {orderDetails.totalAmount}</p>
          <h3>Items:</h3>
          <ul>
            {orderDetails.orderDetails.map((item, index) => (
              <li key={index}>
                {item.itemName} - Rs. {item.unitPrice} x {item.quantity}
              </li>
            ))}
          </ul>
          <p>Discount: Rs. {orderDetails.discountPercentage}</p>
          <p>Final Amount: Rs. {orderDetails.totalAmount}</p>
        </div>
  
        <button onClick={handlePrint}>Print Invoice</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };

export default Invoice;