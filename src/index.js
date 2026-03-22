/**
 * @typedef {import('express').Express} Express
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

import express from 'express';
import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';

/** @type {Express} */
const app = express();
const PORT = 3000;

app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

/**
 * @param {Request} req
 * @param {Response} res
 */
app.get('/', (req, res) => {
  res.json({ message: 'API Bisutería - CRUD con Zod' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
