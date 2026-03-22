import { z } from 'zod';

/**
 * @typedef {Object} Sale
 * @property {number} id
 * @property {number} productId
 * @property {string} productName
 * @property {number} quantity
 * @property {number} unitPrice
 * @property {number} total
 * @property {string} date
 */

/**
 * @typedef {Object} SaleInput
 * @property {number} productId
 * @property {string} productName
 * @property {number} quantity
 * @property {number} unitPrice
 * @property {number} total
 * @property {string} date
 */

export const saleSchema = z.object({
  productId: z.number().int().positive('El ID del producto debe ser positivo'),
  productName: z.string().min(1, 'El nombre del producto es requerido'),
  quantity: z.number().int().positive('La cantidad debe ser mayor a 0'),
  unitPrice: z.number().positive('El precio unitario debe ser positivo'),
  total: z.number().nonnegative('El total no puede ser negativo'),
  date: z.string().min(1, 'La fecha es requerida'),
});

export const saleIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * @type {z.ZodType<SaleInput>}
 */
export const SaleSchema = saleSchema;
