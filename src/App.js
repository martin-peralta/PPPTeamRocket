import { Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
