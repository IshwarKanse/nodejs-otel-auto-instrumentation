const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const pool = require('./db'); // Import database connection

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
// Render the UI
app.get('/', async (req, res) => {
    try {
        const todos = await pool.query('SELECT * FROM todos ORDER BY id ASC');
        console.log("GET request to /");
        res.render('index', { todos: todos.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new TODO
app.post('/todos', async (req, res) => {
    const { title } = req.body;
    try {
        const result = await pool.query('INSERT INTO todos (title) VALUES ($1) RETURNING *', [title]);
        console.log("POST request to /todos");
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a TODO
app.put('/todos/:id/update', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const result = await pool.query('UPDATE todos SET title = $1 WHERE id = $2 RETURNING *', [title, id]);
        console.log("PUT request to /todos/:id/update");
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a TODO
app.delete('/todos/:id/delete', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        console.log("DELETE request to /todos/:id/delete");
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
