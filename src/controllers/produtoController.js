import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});

export const listarProdutos = async (req, res) => {
    const db = await dbPromise;
    const produtos = await db.all("SELECT * FROM produtos");
    res.json(produtos);
};

export const criarProduto = async (req, res) => {
    const { nome, minimo } = req.body;
    const db = await dbPromise;
    await db.run("INSERT INTO produtos (nome, quantidade, minimo) VALUES (?, 0, ?)", [nome, minimo]);
    res.status(201).json({ message: 'Produto criado com sucesso' });
};