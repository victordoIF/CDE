import express from 'express';
import { autenticar, permitir } from '../middlewares/auth.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const router = express.Router();

// Todas as rotas de utilizadores exigem ser admin (Requisito 5.1)
router.use(autenticar, permitir('admin'));

// Listar utilizadores (GET /usuarios)
router.get('/', async (req, res) => {
    const db = await open({ filename: process.env.DB_FILE, driver: sqlite3.Database });
    const usuarios = await db.all("SELECT id, usuario, perfil FROM usuarios");
    res.json(usuarios);
});

// Criar utilizador (POST /usuarios)
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

export default router;