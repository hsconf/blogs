import pg from 'pg';

const client = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'blog',
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => {
        console.error('Connection error', err.stack);
    });

export default client;
