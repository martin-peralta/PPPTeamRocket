import { Link } from 'react-router-dom';
import LogoTR from './LogoTR.png';

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md mt-6 mb-4"> 
      <div className="container mx-auto flex justify-between items-center">    
        <h1 className="text-xl font-bold">Team Rocket Trade</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Inicio</Link>  |
          |  <Link to="/pokemons" className="hover:text-gray-300">Pokemons</Link>  |
          |  <Link to="/colecciones" className="hover:text-gray-300">Colecciones</Link>  |
          |  <Link to="/tienda" className="hover:text-gray-300">Tienda</Link>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="App">
      <Navbar />
      <header className="text-center">
        <h1>Ingresa a tu cuenta o Únete al Team Rocket</h1>
        <nav className="mt-4">
          <Link to="/login" className="mx-2 text-blue-500">Login</Link>
          <Link to="/register" className="mx-2 text-blue-500">Registrarse</Link>
        </nav>
      </header>
    </div>
  );
}

export default Home;
