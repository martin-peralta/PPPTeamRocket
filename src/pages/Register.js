import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister =async () => {
        if (form.name && form.email && form.password) {
            try {
                const response =await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });

                const data =await response.json();

                if (response.ok) {
                    alert('Registro exitoso. Ahora puedes iniciar sesión.');
                    navigate('/login');
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Error al registrar usuario');
            }
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
