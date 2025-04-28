import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './Screens/Home';
import Account from './Screens/Account';
import SearchCards from './Screens/SearchCards';
import CardDetail from './Screens/CardDetail'; // 🔥 Importamos el nuevo componente

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
        <Route path="/cards" element={<SearchCards />} />
        <Route path="/cards/:id" element={<CardDetail />} /> {/* 🔥 Nueva ruta para detalle */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
