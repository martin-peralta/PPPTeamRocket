


/*  Librerias y componentes    */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.email) newErrors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Email not valid';
        if (!form.password) newErrors.password = 'Password is required';
        else if (form.password.length < 6) newErrors.password = 'Min 6 characters';
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords dont match';

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
                alert('¡Register succesful!');
                navigate('/login');
            } else {
                alert(data.message || 'Error joining the team');
            }
        } catch (error) {
            alert('¡Error connecting!');
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h2 className={styles.title}>Join Team Rocket</h2>

            <form onSubmit={handleRegister} className={styles.form}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
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

                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.confirmPassword ? styles.errorInput : ''}`}
                    />
                    {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
                </div>

                <button type="submit" className={styles.button}>
                    🚀 Sign up!
                </button>
            </form>

            <div className={styles.footer}>
                <p>Already a member? </p>
                <Link to="/login" className={styles.link}>
                    🔑 Log in Here
                </Link>
            </div>
        </div>
    );
}

export default Register;