import React from 'react';
import './Modal.css';
import Category from './Category';

const Modal = ({ isOpen,handlecategory, onClose, onAddTable,handlecategorychange, tableName,selectedOption,Category,  handleOptionChange,seatCount, handleTableNameChange, handleSeatCountChange }) => {
  return (
    <div className={`modal1 ${isOpen ? 'open' : ''}`}>
      <div className="modal-content1">
      <h2>Add Table</h2>
        <label htmlFor="tableOptions">Select Table Name:</label>
        <select id="tableOptions" value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select Table</option>
          <option value="bar">Bar</option>
          <option value="garden">Garden</option>
          <option value="table1">Table 1</option>
          <option value="table2">Table 2</option>
          <option value="table3">Table 3</option>
        </select>
        <label htmlFor="seatCount">Number of Seats:</label>
        <input
          type="number"
          id="seatCount"
          value={seatCount}
          onChange={handleSeatCountChange}
        />
         <label htmlFor="category">Category:</label>
<input
  type="text"
  id="category"
  value={handlecategory}
  onChange={handlecategorychange}
/>
        <button onClick={onAddTable}>Add Table</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
