import React, { useState } from 'react';
import { Link } from 'react-scroll';
import styles from './Register.module.css';

function Register() {
    const [form, setForm] = useState({ 
        name: '', 
        email: '', 
        password: '',
        confirmPassword: '' 
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
        if (!form.name) newErrors.name = 'Nombre es requerido';
        if (!form.email) newErrors.email = 'Email es requerido';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Email no válido';
        if (!form.password) newErrors.password = 'Contraseña es requerida';
        else if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                // Lleva automatico al Login con scroll 
                document.getElementById('login-section').scrollIntoView({ behavior: 'smooth' });
            } else {
                alert(data.message || 'Error al registrar usuario');
            }
        } catch (error) {
            alert('Error de conexión');
        }
    };

    return (
        <div id="register-section" className={styles.registerContainer}>
            <h2 className={styles.title}>Registro</h2>
            
            <form onSubmit={handleRegister} className={styles.form}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre completo"
                        value={form.name}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.name ? styles.errorInput : ''}`}
                    />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
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
                        placeholder="Contraseña (mínimo 6 caracteres)"
                        value={form.password}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
                    />
                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar contraseña"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.confirmPassword ? styles.errorInput : ''}`}
                    />
                    {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
                </div>

                <button type="submit" className={styles.button}>
                    Registrarse
                </button>
            </form>

            <div className={styles.footer}>
                <p>¿Ya tienes cuenta? </p>
                <Link 
                    to="login-section" 
                    smooth 
                    duration={500} 
                    className={styles.link}
                >
                    Inicia sesión aquí
                </Link>
            </div>
        </div>
    );
}

export default Register;