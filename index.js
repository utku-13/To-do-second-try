const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// SQLite Veritabanı Başlatma
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Veritabanına bağlanılamadı', err);
    } else {
        console.log('Veritabanına bağlanıldı');
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT 0
        )`);
    }
});

// Görevleri Getir
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });
});

// Yeni Görev Ekle
app.post('/tasks', (req, res) => {
    const { task } = req.body;
    db.run('INSERT INTO tasks (task) VALUES (?)', [task], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ id: this.lastID, task, completed: 0 });
    });
});

// Görevi Güncelle
app.put('/tasks/:id', (req, res) => {
    const { task, completed } = req.body;
    const { id } = req.params;
    db.run('UPDATE tasks SET task = ?, completed = ? WHERE id = ?', [task, completed, id], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ id, task, completed });
    });
});

// Görev Sil
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ result: true });
    });
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
