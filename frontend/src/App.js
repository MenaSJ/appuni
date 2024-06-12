import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

function App() {
  
  return (
    <>
      <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
