/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

import { getAllSales, getSaleById, createSale, deleteSale } from '../models/data.js';
import { saleSchema, saleIdSchema } from '../schemas/saleSchema.js';

/**
 * @param {Request} req
 * @param {Response} res
 */
export const getSales = (req, res) => {
  res.json(getAllSales());
};

/**
 * @param {Request} req
 * @param {Response} res
 */
export const getSale = (req, res) => {
  const parseResult = saleIdSchema.safeParse(req.params);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.issues });
  }
  
  const sale = getSaleById(parseResult.data.id);
  if (!sale) {
    return res.status(404).json({ error: 'Venta no encontrada' });
  }
  res.json(sale);
};

/**
 * @param {Request} req
 * @param {Response} res
 */
export const addSale = (req, res) => {
  const parseResult = saleSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.issues });
  }
  
  const sale = createSale(parseResult.data);
  res.status(201).json(sale);
};

/**
 * @param {Request} req
 * @param {Response} res
 */
export const removeSale = (req, res) => {
  const parseResult = saleIdSchema.safeParse(req.params);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.issues });
  }
  
  const deleted = deleteSale(parseResult.data.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Venta no encontrada' });
  }
  res.status(204).send();
};
