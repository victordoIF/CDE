import express from 'express';
import { autenticar, permitir } from '../middlewares/auth.js';
import * as estoqueCtrl from '../controllers/estoqueController.js';

const router = express.Router();

router.get('/produtos', autenticar, permitir('admin', 'estoquista', 'consulta'), estoqueCtrl.listarProdutos);
router.post('/produtos', autenticar, permitir('admin', 'estoquista'), estoqueCtrl.criarProduto);
router.post('/movimentacoes', autenticar, permitir('admin', 'estoquista'), estoqueCtrl.realizarMovimentacao);
router.get('/relatorios/baixo-estoque', autenticar, permitir('admin', 'estoquista', 'consulta'), estoqueCtrl.relatorioBaixoEstoque);

export default router;