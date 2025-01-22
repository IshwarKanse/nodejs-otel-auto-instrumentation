const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a connection pool
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'todos',
    password: process.env.DB_PASSWORD || 'mysecretpassword',
    port: process.env.DB_PORT || 5432,
});

module.exports = pool;
