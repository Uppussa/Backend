import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, updateUserProfile, createUser } from '../model/usuario.model.js';
import { SECRET_KEY } from '../config/config.js';

export const register = async (req, res) => {
    const { email, password } = req.body;

    if (password.length < 8 || !/[A-Z]/.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one uppercase letter.' });
    }

    try {
        const user = await findUserByEmail(email);
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(email, hashedPassword);

        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'User verified', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const dashboard = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const email = decodedToken.email;

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const email = decodedToken.email;
        const { name, phone, bio } = req.body;
        const profileImage = req.file ? `/uploads/${req.file.filename}` : req.body.profileImage;
        await updateUserProfile(email, {profileImage, name, phone, bio});
        res.status(200).json({ message: 'Profile updated' });
    } catch (error) {
        console.error("Error in updateProfile function:", error.message);
        res.status(500).json({ message: error.message });
    }
};
