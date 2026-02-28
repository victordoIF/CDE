import express from 'express';
import { autenticar, permitir } from '../middlewares/auth.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const router = express.Router();

router.use(autenticar, permitir('admin'));

router.get('/', async (req, res) => {
    const db = await open({ filename: process.env.DB_FILE, driver: sqlite3.Database });
    const usuarios = await db.all("SELECT id, usuario, perfil FROM usuarios");
    res.json(usuarios);
});

router.post('/', async (req, res) => {
    const { usuario, senha, perfil } = req.body;
    const db = await open({ filename: process.env.DB_FILE, driver: sqlite3.Database });
    try {
        await db.run("INSERT INTO usuarios (usuario, senha, perfil) VALUES (?, ?, ?)", [usuario, senha, perfil]);
        res.status(201).json({ message: 'Utilizador criado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: 'Utilizador já existe' });
    }
});

router.patch('/:id/perfil', autenticar, permitir('admin'), async (req, res) => {
    const { perfil } = req.body;
    const db = await open({ filename: process.env.DB_FILE, driver: sqlite3.Database });
    await db.run("UPDATE usuarios SET perfil = ? WHERE id = ?", [perfil, req.params.id]);
    res.json({ message: 'Perfil atualizado' });
});

export default router;