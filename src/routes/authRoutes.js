import express from 'express';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;

    const db = await open({
        filename: process.env.DB_FILE,
        driver: sqlite3.Database
    });

    const user = await db.get("SELECT * FROM usuarios WHERE usuario = ? AND senha = ?", [usuario, senha]);

    if (user) {
        const token = jwt.sign(
            { id: user.id, usuario: user.usuario, perfil: user.perfil },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.json({ token });
    }

    res.status(401).json({ error: 'Utilizador ou senha inválidos' });
});

export default router;