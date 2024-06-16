import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Home from './pages/Home/Home';

function App() {
  
  return (
    <>
      <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
