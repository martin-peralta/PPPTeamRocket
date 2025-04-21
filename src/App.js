import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages 
import Home from './Screens/Home';
import Cards from './Screens/Cards';
import Account from './Screens/Account'; 

// Components
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';


function App() {
  return (
    <div className="App">
      <Router>
       <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Cards" element={<Cards />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
