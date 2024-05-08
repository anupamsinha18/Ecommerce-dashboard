import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTable from './Component/AddTable';
import Navbar from './Component/Navbar';
import Category from './Component/Category';
import Kitchen from './Component/Kitchen';

function App() {
  return (
    <>
    <Navbar/>
    <Router>
        <Routes>
          <Route path="/" element={<AddTable />} />
          <Route path="/catgory" element={<Category />} />
          <Route path="/Kitchen" element={<Kitchen />} />
        </Routes>
     
    </Router>
    </>
  );
}

export default App;
