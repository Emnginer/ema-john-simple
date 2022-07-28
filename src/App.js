import React, { createContext, useState } from 'react';
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
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [logInUser, setLogInUser] = useState({});


  return (
    <UserContext.Provider value={[logInUser, setLogInUser]}>
      {/* <h2>{logInUser.email}</h2> */}
      
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/review" element={<Review/>}></Route>

          <Route path="/inventory" element={<PrivateRoute><Inventory/></PrivateRoute>}></Route>
          <Route path="/login" element={<Login/>}></Route>

          <Route path="/shipment" element={<PrivateRoute><Shipment/></PrivateRoute>}/>

          <Route path="/product/:productKey" element={<ProductDetail/>}></Route>
          <Route path="*" element={<Notfound></Notfound>}></Route>

        </Routes>
      </BrowserRouter>


     
      {/* <Shop></Shop> */}

    </UserContext.Provider>
  );
}

export default App;
