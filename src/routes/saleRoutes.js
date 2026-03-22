import { Router } from 'express';
import { getSales, getSale, addSale, removeSale } from '../controllers/saleController.js';

/** @type {import('express').Router} */
const router = Router();

router.get('/', getSales);
router.get('/:id', getSale);
router.post('/', addSale);
router.delete('/:id', removeSale);

export default router;
