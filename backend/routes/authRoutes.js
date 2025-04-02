import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Si el user ya está regsitrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }
        //Hash a la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
});

export default router;
