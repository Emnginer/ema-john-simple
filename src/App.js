import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/NotFound/Notfound';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/review" element={<Review/>}></Route>
          <Route path="/inventory" element={<Inventory/>}></Route>
          <Route path="/product/:productKey" element={<ProductDetail/>}></Route>
          <Route path="*" element={<Notfound></Notfound>}></Route>

        </Routes>
      </BrowserRouter>


     
      {/* <Shop></Shop> */}

    </div>
  );
}

export default App;
