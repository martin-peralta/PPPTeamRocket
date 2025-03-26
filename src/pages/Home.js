import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Titulo de prueba</h1>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/register">Registrarse</Link>
        </nav>
      </header>
    </div>
  );
}

export default Home;
