import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login users={users} />} />
          <Route path="/register" element={<Register setUsers={setUsers} />} />
        </Routes>
      </Router>

          
    
      </header>
    </div>
  );
}

export default App;
