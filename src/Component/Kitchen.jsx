import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Kitchen.css';

const Kitchen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/kit/get');
      setOrders(response.data.kitchens);
      console.log(response.data.kitchens); // Check if data is fetched successfully
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Handle error
    }
  };

  // Helper function to group orders by table name
  const groupOrdersByTable = orders => {
    const groupedOrders = {};
    orders.forEach(order => {
      const tableName = order.tablename;
      if (!groupedOrders[tableName]) {
        groupedOrders[tableName] = [];
      }
      groupedOrders[tableName].push(order);
    });
    return groupedOrders;
  };

  const groupedOrders = groupOrdersByTable(orders);

  return (
    <div className="kitchen-orders-container">
      {Object.keys(groupedOrders).map(tableName => (
        <div key={tableName} className="order-card">
          <h3>Table Name: {tableName}</h3>
          {groupedOrders[tableName].map(order => (
            <div className='quantityy' key={order.idkitchen}>
              <h4>Order: {order.itemname}</h4>
              <div>Quantity: {order.quantity}</div>
              {/* Display other relevant information */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Kitchen;
