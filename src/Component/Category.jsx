import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Category.css'

const Category = () => 
{const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedcatagorie, setSelectedcatagorie] = useState('');
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product/get');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    const handlecatagorieChange = (e) => {
      const catagorie = e.target.value;
      setSelectedcatagorie(catagorie);
      if (catagorie === '') {
        setFilteredProducts(products); // Reset to original data when no catagorie selected
      } else {
        const filteredData = products.filter(product => product.catagorie === catagorie);
        setFilteredProducts(filteredData);
      }
    };
  
    return (
      <div className='category'>
          <h1>Product List</h1>
          <div className="filter">
            <label htmlFor="catagorieSelect">Filter by catagorie:</label>
            <select id="catagorieSelect" value={selectedcatagorie} onChange={handlecatagorieChange}>
              <option value="">All</option>
              <option value="Cake">Cake</option>
              <option value="Non-Veg">Non_veg</option>
              <option value="Veg">Veg</option>
            </select>
          </div>
          <div className="product-list">
            {filteredProducts.map(item => (
                    <div key={item.id} className="product-item">
                    <img src={item.img} alt={item.name} />
                    <h3>{item.productname}</h3>
                    <p>{item.productdec}</p>
                    <h3><b>₹{item.price}</b></h3>
                    {item.oldprice && <del>₹{item.oldprice.toFixed(2)}</del>}</div>
            ))}
          
      </div>
      </div>
    );
  }

export default Category