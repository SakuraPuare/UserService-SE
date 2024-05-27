import User, { IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
export const registerUser = async (username: string, password: string):
    Promise<IUser> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    return await user.save();
};
export const loginUser = async (username: string, password: string):
    Promise<IUser | null> => {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
};