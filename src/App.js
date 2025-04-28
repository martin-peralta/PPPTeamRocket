import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './Screens/Home';
import Account from './Screens/Account';
import SearchCards from './Screens/SearchCards';
import CardDetail from './Screens/CardDetail';

// Auth Pages
import Login from './pages/Login'; // 🔥 Importamos Login
import Register from './pages/Register'; // 🔥 Importamos Register

// Components
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cards/:id" element={<CardDetail />} />
        <Route path="/cards" element={<SearchCards />} />
        <Route path="/login" element={<Login />} /> {/* 🔥 Nueva ruta Login */}
        <Route path="/register" element={<Register />} /> {/* 🔥 Nueva ruta Register */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
