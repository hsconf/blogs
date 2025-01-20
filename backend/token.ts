import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const getToken = (id: string) => {

    if (!process.env.SECRET_KEY_IS) {
        throw new Error('Secret key is missing');
    }

    return  jwt.sign({ id, iat: Math.floor(Date.now() / 1000) }, process.env.SECRET_KEY_IS);
}