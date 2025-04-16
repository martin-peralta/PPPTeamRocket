import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import React from 'react';
import Loading from './pages/Loading';
import ToastPage from "./pages/ToastPage";

function App() {
  const [users, setUsers] = useState([]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login users={users} />} />
          <Route path="/register" element={<Register setUsers={setUsers} />} />
          <Route path="/loading" element={<Loading />} /> 
          <Route path="/toast" element={<ToastPage />} />
        </Routes>
      </Router>

          
  
    </div>
  );
}

export default App;
