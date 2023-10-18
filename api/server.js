const express = require('express');
const app = express();
const port = 5000;
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '7055',
    port: 5432,
});


app.use(cors());

app.get('/', (req, res) => {
    pool.query('SELECT * FROM contemberdata', (error, results) => {
        if (error) {
            throw error;
        }
        res.json(results.rows);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
