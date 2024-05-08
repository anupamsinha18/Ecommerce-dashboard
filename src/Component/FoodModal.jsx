import React, { useEffect, useState } from 'react';
import './FoodModal.css';
import axios from 'axios';

const FoodModal = ({ isOpen, onClose,handleSendData, selectedItems,selectedTable, onSelectItem, onQuantityChange, onRemoveItem,foodlist }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/product/get');
      setFoodItems(response.data.products); // Assuming 'products' is the array containing product data
      setFilteredItems(response.data.products); // Initialize filtered items with all products
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredItems(foodItems); // Reset to all items when no category selected
    } else {
      const filteredData = foodItems.filter(product => product.catagorie === category);
      setFilteredItems(filteredData);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="food-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={onClose}>Close</button>
            <h2>Select Food Items</h2>
            {selectedTable && (
              <div className='carddd'>
              <div className="selected-table-info">
                <p>Table Name: {selectedTable.tablename}</p>
                <p>Seat Count: {selectedTable.sete} seats</p>
                <p> table id :{selectedTable.tableid}</p>
              </div>
              <div className='ordersend'>
                <button className='sendorder' onClick={() => handleSendData( selectedTable.tableid,selectedTable.tablename)}>send order to kitchen</button>
                </div>
              </div>
             )}
            
            <div className="categories">
              <label htmlFor="categorySelect">Filter by Category:</label>
              <select id="categorySelect" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value="">All</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Veg">Veg</option>
              </select>
            </div>
            <div className='side'>
            <table className="food-table">
              <thead>
                <tr>
                  <th>Food Item</th>
                  
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.productid} onClick={() =>{ onSelectItem(item,selectedTable.tableid)
                  console.log(selectedTable.tableid)
                  
                  }}>
                    <td>{item.productname}</td>
                 {/* You can adjust the quantity handling */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="selected-items">
              <h3>Selected Items</h3>
              <table className="selected-table">
                <thead>
                  <tr>
                    <th>Food Item</th>
                    <th>Quantity</th>
                    <th>portion</th>
                  </tr>
                </thead>
                <tbody>
                {foodlist.map((item) => (
                    <tr key={item.id}>
                      <td>{item.foodname}</td>
                      <td>
                        <input
                          type="number"
                            
                          value={item.quantity}
                          onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
                          min={1}
                        />
                       </td>
                     
                      <td>
                        <button className="remove-btn" onClick={() =>{ onRemoveItem(item.id)
                      console.log(item.id)}
                      }>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodModal;
