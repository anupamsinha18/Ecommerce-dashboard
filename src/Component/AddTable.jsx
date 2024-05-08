import React, { useState,useEffect } from 'react';
import Modal from './Modal';
import './AddTable.css';
import FoodModal from './FoodModal';
import axios from 'axios'


const AddTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tableName, setTableName] = useState('');
  const [selectedTable, setSelectedTable] = useState({}); // State to store selected table information
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [seatCount, setSeatCount] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const[categoryseat,setCategoryseat] =useState([]);
  const [foodlist,setfoodlist]= useState([])
  const[id,setId] =useState([])
  const [quantity,setquantiyt]=useState()
  const[sendata,setSendData]=useState()
  // const[handlESendData,Sethandlsenddata]=useState()

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
useEffect(()=>{
  handleget()
},[])

useEffect(()=>{
 handelgetfoodlist()
 
},[id])


  
const handleSendData = async (id,names) => {
 
console.log(id , names)
  foodlist.map(async (item) => {
    console.log(item.foodname,item.id)
    try {
      const response = await axios.post('http://localhost:5000/api/kit/post', {
        itemname: item.foodname,
        tablename: names,
        quantity : item.quantity,
        tid: id,
        fid: item.foodid, // Assuming this is a fixed value for fid
      });

      if (response.status === 200) {
        console.log('Order sent successfully:', response.data);
        // Handle success, update state or perform other actions
      } else {
        alert('Failed to send order. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending order:', error);
      alert('An error occurred while sending the order. Please try again.');
    }
  });
};


  <button className='sendorder' onClick={() => handleSendData(selectedItems, selectedTable)}>
    send order to kitchen
  </button>
  

   
    // Log the entire response object for debugging
  
  // const handleAddTable = () => {
    
  //   if (tableName.trim() !== '' && seatCount.trim() !== '') {
  //     setTables([...tables, { tableName, seatCount }]);
  //     setTableName('');
  //     setSeatCount('');
  //     setModalOpen(false);
  //   } else {
  //     alert('Please enter both table name and seat count.');
  //   }
  // };
 
  const handleAddTable = async () => {
    try {
      if (selectedOption.trim() !== '' && seatCount.trim() !== '' && categoryseat.trim() !== '') {
        const newSeatCount = parseInt(seatCount);
        const newSetCategory = parseInt(categoryseat); 
        console.log(newSetCategory)// Assuming category is a number
        const response = await axios.post('http://localhost:5000/api/table/post', {
          tablename: selectedOption,
          sete: newSeatCount,
          category: newSetCategory,
        });
        if (response.status === 200) {
          setTables([...tables, response.data]); // Assuming response.data is the newly added table
          setSelectedOption('');
          setSeatCount('');
          setModalOpen(false);
          setCategoryseat(''); // Reset the category field after successful submission
        } else {
          alert('Failed to add table. Please try again later.');
        }
      } else {
        alert('Please select a table name, enter seat count, and choose a category.');
      }
    } catch (error) {
      console.error('Error adding table:', error);
      alert('An error occurred while adding the table. Please try again.');
    }
  };
  

  const handleget = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/table/get');
      console.log('Response:', response.status); // Log the entire response object for debugging
      if (response.status === 200) {
        setTables(response.data.tables); // Assuming response.data.tables is the array of tables
        console.log('Tables:', response.data.tables); // Log the tables data
      } else {
        // alert('Failed to fetch tables. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      // alert('An error occurred while fetching tables. Please try again.');
    }
  };
  


  const removeItem = async(id) => {
    console.log(id )
    try{
      const response = await axios.delete(`http://localhost:5000/api/food/del/${id}`);
    
    } catch (error) {
      console.error('Error fetching tables:', error);
      alert('An error occurred while fetching tables. Please try again.');
    }
    };
    // const updatedItems = selectedItems[selectedTable.tableName].filter((item) => item.id !== id);
    // const updatedSelectedItems = { ...selectedItems, [selectedTable.tableName]: updatedItems };
    // setSelectedItems(updatedSelectedItems);
  

  const handleTableCardClick = (table) => {
    setId(table.tableid)
    setSelectedTable(table);
    console.log(id)
    // If selected items for the clicked table already exist, use them, otherwise initialize an empty array
    const items = selectedItems[table.tableName] ? selectedItems[table.tableName] : [];
    setSelectedItems({ ...selectedItems, [table.tableName]: items });
    setFoodModalOpen(true);
  };
  const handelgetfoodlist =  async ()=>{
    console.log(id)
    try {
      const response = await axios.get(`http://localhost:5000/api/food/get/${id}`);
      console.log('Response:', response.status); // Log the entire response object for debugging
      if (response.status === 200) {
        setfoodlist(response.data.foodlists); // Assuming response.data.tables is the array of tables
        console.log('foodlist:', response.data.foodlists); // Log the tables data
      } else {
        // alert('Failed to fetch tables. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      // alert('An error occurred while fetching tables. Please try again.');
    }
  }

  const handleItemSelect = async (item,id) => {
    console.log(item)
    console.log(id)
    try {
      const response = await axios.post('http://localhost:5000/api/food/post',{
      foodname:item.productname,
      quantity : 1,
        idtable : id,
        foodid : item.productid
      });
      console.log('Response:', response.status); // Log the entire response object for debugging
      if (response.status === 200) {
        handelgetfoodlist()
        
         // Assuming response.data.tables is the array of tables
      // Log the tables data
      } else {
        alert('Failed to fetch tables. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      alert('An error occurred while fetching tables. Please try again.');
    }
    // // Initialize selectedItems for the selected table if it doesn't exist
    // const items = selectedItems[selectedTable.tableName] ? selectedItems[selectedTable.tableName] : [];
    // // Add item to the selectedItems array for the selected table
    // setSelectedItems({ ...selectedItems, [selectedTable.tableName]: [...items, item] });
  };
  const handleQuantityChange = async (id, newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/food/qun/${id}`,{
   quantity : newQuantity
      });
      console.log('Response:', response.status); // Log the entire response object for debugging
      if (response.status === 200) {
        handelgetfoodlist()
        
         // Assuming response.data.tables is the array of tables
      // Log the tables data
      } else {
        alert('Failed to fetch tables. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      alert('An error occurred while fetching tables. Please try again.');
    }

  };
  
  
  return (
    <div className="add-table">
      <button className="add" onClick={() => setModalOpen(true)}>
        Add Table Content
      </button>
      <div className="table-list">
  {tables.map((table, index) => (
    <div key={index} className="table-card" onClick={() => handleTableCardClick(table)}>
      <p>Table Name: {table.tablename}</p>
      <p>Seat Count: {table.sete} seats</p>
    </div>
  ))}
</div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddTable={handleAddTable}
        tableName={tableName}
        handleOptionChange={handleOptionChange}
        seatCount={seatCount}
        handlecategorychange={(e) => setCategoryseat(e.target.value)}
        handlecategory={categoryseat}
        handleTableNameChange={(e) => setTableName(e.target.value)}
        handleSeatCountChange={(e) => setSeatCount(e.target.value)}
      />
      <FoodModal
        isOpen={foodModalOpen}
        onClose={() => setFoodModalOpen(false)}
        selectedItems={selectedItems[selectedTable.tableName] || []}     
        onSelectItem={handleItemSelect}
        onQuantityChange={handleQuantityChange}
        tableNumber={selectedTable.tableName}
        seatCount={selectedTable.seatCount}
        selectedTable={selectedTable} 
        onRemoveItem={removeItem}
        handleSendData={handleSendData}
        foodlist={foodlist}
      />
    </div>
  );
};

export default AddTable;
