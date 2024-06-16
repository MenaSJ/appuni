import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
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
