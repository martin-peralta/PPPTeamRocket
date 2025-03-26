import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register({ setUsers }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (form.name && form.email && form.password) {
      setUsers((prevUsers) => [...prevUsers, form]);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Registro</h2>
        <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Correo Electrónico" value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
        <button onClick={handleRegister}>Registrarse</button>
        <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
      </header>
    </div>
  );
}

export default Register;
