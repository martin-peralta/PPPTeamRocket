import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response =await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data =await response.json();

            if (response.ok) {
                alert(`Bienvenido!`) ;
                navigate('/');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error al iniciar sesión');
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
