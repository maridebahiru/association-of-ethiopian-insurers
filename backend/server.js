const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Setup Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Database Connection
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDB();
    }
});

function initializeDB() {
    db.serialize(() => {
        // News Table
        db.run(`CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT,
            date TEXT NOT NULL,
            isExternal BOOLEAN DEFAULT 0,
            externalUrl TEXT,
            coverImage TEXT
        )`);

        // Proclamations Table
        db.run(`CREATE TABLE IF NOT EXISTS proclamations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            date TEXT NOT NULL,
            fileUrl TEXT
        )`);

        // Publications Table
        db.run(`CREATE TABLE IF NOT EXISTS publications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            date TEXT NOT NULL,
            coverImage TEXT,
            fileUrl TEXT
        )`);
    });
}

// ------------------------------------
// NEWS API ENDPOINTS
// ------------------------------------
app.get('/api/news', (req, res) => {
    db.all('SELECT * FROM news ORDER BY date DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/news', upload.single('coverImage'), (req, res) => {
    const { title, content, date, isExternal, externalUrl } = req.body;
    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

    db.run(
        `INSERT INTO news (title, content, date, isExternal, externalUrl, coverImage) VALUES (?, ?, ?, ?, ?, ?)`,
        [title, content, date, isExternal === 'true' ? 1 : 0, externalUrl, coverImage],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, title, content, date, isExternal, externalUrl, coverImage });
        }
    );
});

app.delete('/api/news/:id', (req, res) => {
    db.run('DELETE FROM news WHERE id = ?', req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// ------------------------------------
// PROCLAMATIONS API ENDPOINTS
// ------------------------------------
app.get('/api/proclamations', (req, res) => {
    db.all('SELECT * FROM proclamations ORDER BY date DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/proclamations', upload.single('file'), (req, res) => {
    const { title, description, date } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    db.run(
        `INSERT INTO proclamations (title, description, date, fileUrl) VALUES (?, ?, ?, ?)`,
        [title, description, date, fileUrl],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, title, description, date, fileUrl });
        }
    );
});

app.delete('/api/proclamations/:id', (req, res) => {
    db.run('DELETE FROM proclamations WHERE id = ?', req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// ------------------------------------
// PUBLICATIONS API ENDPOINTS
// ------------------------------------
app.get('/api/publications', (req, res) => {
    db.all('SELECT * FROM publications ORDER BY date DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/publications', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'file', maxCount: 1 }]), (req, res) => {
    const { title, description, date } = req.body;
    const coverImage = req.files && req.files['coverImage'] ? `/uploads/${req.files['coverImage'][0].filename}` : null;
    const fileUrl = req.files && req.files['file'] ? `/uploads/${req.files['file'][0].filename}` : null;

    db.run(
        `INSERT INTO publications (title, description, date, coverImage, fileUrl) VALUES (?, ?, ?, ?, ?)`,
        [title, description, date, coverImage, fileUrl],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, title, description, date, coverImage, fileUrl });
        }
    );
});

app.delete('/api/publications/:id', (req, res) => {
    db.run('DELETE FROM publications WHERE id = ?', req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
