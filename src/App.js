//App.js
// приложение использует react redux-toolkit redux-thunk,

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/index";
import Banner from "./components/Banner/Banner";
import MainContent from "./components/Main/MainContent";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer/Footer";
import About from "./components/About";
import Contacts from "./components/Contacts";
import ProductPage from "./components/Main/ProductPage";
import CartPage from "./components/Main/CartPage";

import "./components/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
function App() {
  return (
    <Router>
      <Header />
      <main className='container'>
        <div className='row'>
          <div className='col'>
            <Banner />
            <Routes>
              <Route path='/' element={<MainContent />} />
              <Route path='/catalog' element={<MainContent />} />
              <Route path='/catalog/:categoryId' element={<MainContent />} />
              <Route path='/about' element={<About />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/catalog/:id.html' element={<ProductPage />} />
              <Route path='/cart' element={<CartPage />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
