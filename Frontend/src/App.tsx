
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home'; 
import Properties from './components/Properties';
import Watches from './components/Watches';
import Cars from './components/Cars';
import MobilePhones from './components/MobilePhones';
import Motorcycles from './components/Motorcycles';
import Cameras from './components/Cameras';
import ProductDisplay from './components/ProductDisplay';
import FavoriteProducts from './components/FavoriteProducts';


function App() {


  return (
    <Router>    
      <Routes>

        <Route path="/" element={<HomePage />} /> 
        <Route path="/cars" element={<Cars/>}/>
        <Route path="/mobilephones" element={<MobilePhones/>}/>
        <Route path="/properties" element={<Properties/>}/>
        <Route path="/watches" element={<Watches/>}/>
        <Route path="/motorcycles" element={<Motorcycles/>}/>
        <Route path="/favoriteproducts" element={<FavoriteProducts />} />      
        <Route path="/cameras" element={<Cameras/>}/>
        <Route path="/product/:id" element={<ProductDisplay />} />

        {/* Add other routes here */}
      </Routes>
    </Router>
    
  );
}

export default App;
