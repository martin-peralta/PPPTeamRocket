// Librerías y componentes
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Páginas
import Home from './Screens/Home';
import Account from './Screens/Account';
import SearchCards from './Screens/SearchCards';
import CardDetail from './Screens/CardDetail';
// Login/register
import Login from './pages/Login';
import Register from './pages/Register';
// Pantalla de carga
import Loading from './pages/Loading';

// Componentes
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import InventoryView from './Components/InventoryView';  
import CreateCollection from './Components/CreateCollection';
import MyCollections from './Components/MyCollections';
import CollectionDetail from './Components/CollectionDetail';



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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loadingscreen" element={<Loading />} />
        <Route path="/collections" element={<InventoryView />} />             
        <Route path="/collections/inventory" element={<InventoryView />} />
        <Route path="/collections/mycollections" element={<MyCollections />} />  
        <Route path="/collections/create" element={<CreateCollection />} />
        <Route path="/collections/detail/:index" element={<CollectionDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
