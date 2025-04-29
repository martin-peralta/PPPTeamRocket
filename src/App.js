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

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Loading Screen
import Loading from './pages/Loading';

function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cards/:id" element={<CardDetail />} />
        <Route path="/cards" element={<SearchCards />} />
        <Route path="/login" element={<Login />} /> {/* 🔥 Nueva ruta Login */}
        <Route path="/register" element={<Register />} /> {/* 🔥 Nueva ruta Register */}
        <Route path="/loadingscreen" element={<Loading />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
