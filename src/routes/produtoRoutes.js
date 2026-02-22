import express from 'express';
import { autenticar, permitir } from '../middlewares/auth.js';
import * as produtoCtrl from '../controllers/produtoController.js';

const router = express.Router();

router.get('/', autenticar, permitir('admin', 'estoquista', 'consulta'), produtoCtrl.listarProdutos);
router.post('/', autenticar, permitir('admin', 'estoquista'), produtoCtrl.criarProduto);

export default router;