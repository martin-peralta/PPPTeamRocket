import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Footer from './Screens/Footer';
import Perfil from './Screens/Perfil'; 
import Navbar from "./Components/Navbar"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
