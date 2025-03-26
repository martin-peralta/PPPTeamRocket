import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ users }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const user = users.find((u) => u.email === form.email && u.password === form.password);
    if (user) {
      alert(`Bienvenido, ${user.name}!`);
      navigate('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Iniciar Sesión</h2>
        <input type="email" name="email" placeholder="Correo Electrónico" value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
        <button onClick={handleLogin}>Iniciar Sesión</button>
        <Link to="/register">¿No tienes cuenta? Regístrate</Link>
      </header>
    </div>
  );
}

export default Login;
