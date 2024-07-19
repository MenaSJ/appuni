// App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './pages/Home/Home';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import Search from './pages/Search/Search';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import Details from './pages/Details/Details';
import RutaProtegida from './Components/Protected/RutaProtegida';
import SinPermiso from './Components/Protected/SinPermiso';
import AppProvider from './context/Context';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <ScrollToTop />
          {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path='*' element={<Home />} />
            <Route path='/' element={<Home />} />
            <Route path='/details' element={<Details />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/search' element={<Search />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path='/bloqueado' element={<SinPermiso />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AppProvider>
  );
}
  const ScrollToTop = () => {
    // Extracts pathname property(key) from an object
    const { pathname } = useLocation();
    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  }

export default App;
