import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navb from './components/Navbar';
import Cart from './components/user/cart';
import Signup from './components/Signup'
import st from './components/style';
import Admin from './components/admin';
import Product from './components/product';
import Sell from "./components/seller/Sell.js";
import Products from './components/seller/products';
import ChatApp from './components/chat';
import TodoApp from './components/todo';
import Account from './pages/account';
import AddressForm from './pages/AddressForm';
import Buy from './pages/Buy';
import SelectAddress from './components/buy/selectAddress';
import SelectPayment from "./components/buy/selectPayment";
import Orders from './pages/orders';
import Search from './pages/search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <Navb style={st.navbar} />
      <div style={{ height: "60px" }}></div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/search/:product' element={<Search />} />
        <Route path='/secret' element={<Admin />} />
        <Route path='/account' element={<Account />} />
        <Route path='/account/addAddress' element={<AddressForm />} />
        <Route path='/buy' element={<Buy />} >
          <Route path="" element={<SelectAddress />} />
          <Route path="payment" element={<SelectPayment />} />
        </Route>
        <Route path='/orders' element={<Orders />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/sell' element={<Sell />} />
        <Route path='/products' element={<Products />} />
        <Route path='/chat' element={<ChatApp />} />
        <Route path='/todo' element={<TodoApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

