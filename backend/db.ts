import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new pg.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => {
        console.error('Connection error', err.stack);
    });

export default client;
