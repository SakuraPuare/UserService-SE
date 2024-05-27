import { Request, Response } from 'express';
import * as userService from '../services/userService';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET as string || 'jwtsecret';
export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const user = await userService.registerUser(username, password);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const user = await userService.loginUser(username, password);

        if (user) {
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};