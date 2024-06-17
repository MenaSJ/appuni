import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './pages/Home/Home';
import LoginPopup from './Components/LoginPopup/LoginPopup';

function App() {
  
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <div className="App">
        {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
        <Router>
          <Navbar setShowLogin = {setShowLogin} />
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