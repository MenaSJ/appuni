// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import Details from './pages/Details/Details';
import SinPermiso from './Components/Protected/SinPermiso';
import AppProvider, { AppContext } from './context/Context';
import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';
import Favorites from './pages/Favorites/Favorites';
import AdminUniversitiesPage from './pages/AdminUniversitiesPage/AdminUniversitiesPage';
import ReportsPage from './pages/ReportsPage/ReportsPage';
import RequireAuth from './Components/RequireAuth/RequireAuth';
import Unauthorized from './Components/Unauthorized/Unauthorized';
import { useContext } from 'react';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <AppProvider>
      <Router>
          <Routes>
            <Route path='/' element={<Layout />} >
              {/*rutas publicas */}
              <Route path='/' element={<Home />} />
              <Route path='/details' element={<Details />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path='/search' element={<Search />} />
            <Route path="/details/:id" element={<Details />} />
              <Route path='/bloqueado' element={<SinPermiso />} />
              <Route path='/reset-password/:token' element={<ResetPassword />} />
              <Route path='/reportes' element={<ReportsPage />} />
              <Route path='/unauthorized' element={<Unauthorized />} />
            
              {/*rutas protegidas */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                <Route path='/favoritos' element={<Favorites />} />
                <Route path='/profile' element={<Profile />} /> 
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
                <Route path='/admin' element={<Admin />}/>
                <Route path='/admin/universities' element={<AdminUniversitiesPage />} />
            </Route>
              <Route path='*' element={<Home />} />
            </Route>
          </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
