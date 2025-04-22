import React, { useState } from 'react';
import { Link } from 'react-scroll';
import styles from './Login.module.css';

function Login() { // Input
    const [form, setForm] = useState({ 
        email: '', 
        password: '' 
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.email) newErrors.email = 'Email es requerido';
        if (!form.password) newErrors.password = 'Contraseña es requerida';
        else if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try { // Conexion BBDD
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`¡Bienvenido!`);
                document.getElementById('home-section').scrollIntoView({ behavior: 'smooth' }); // Lleva a pagina Home
            } else {
                alert(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            alert('Error de conexión');
        }
    };

    return (
        <div id="login-section" className={styles.loginContainer}>
            <h2 className={styles.title}>Iniciar Sesión</h2>
            
            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={form.email}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
                    />
                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                </div>

                <button type="submit" className={styles.button}>
                    Iniciar Sesión
                </button>
            </form>

            <div className={styles.footer}>
                <p>¿No tienes cuenta? </p>
                <Link 
                    to="register-section" 
                    smooth 
                    duration={500} 
                    className={styles.link}
                >
                    Regístrate aquí
                </Link>
            </div>
        </div>
    );
}

export default Login;