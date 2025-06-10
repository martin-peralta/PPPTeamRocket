/*  Librerias y componentes    */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.password) newErrors.password = 'Password is required';
        else if (form.password.length < 6) newErrors.password = 'Min 6 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok && data.token && data.user) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                login({ user: data.user, token: data.token });

                toast.success(`Welcome back, ${data.user.name}! 🚀`);
                navigate('/');
            } else {
                toast.error(data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Error connecting to server');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.title}>Access to your collection</h2>

            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
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
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
                    />
                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                </div>

                <button type="submit" className={styles.button}>
                    🔓 Log in
                </button>
            </form>

            <div className={styles.footer}>
                <p>New recruit? </p>
                <Link to="/register" className={styles.link}>
                    Join us here
                </Link>
            </div>
        </div>
    );
}

export default Login;
