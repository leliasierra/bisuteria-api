/**
 * @typedef {import('../schemas/productSchema.js').Product} Product
 * @typedef {import('../schemas/saleSchema.js').Sale} Sale
 */

/** @type {Product[]} */
let products = [
  { id: 1, name: "Collar de perlas", material: "Plata 925", category: "Collares", price: 45000, stock: 15, minStock: 5 },
  { id: 2, name: "Aretes artesanales", material: "Cuentas", category: "Aretes", price: 25000, stock: 20, minStock: 10 },
  { id: 3, name: "Pulsera de di", material: "Hilos", category: "Pulseras", price: 15000, stock: 30, minStock: 15 },
  { id: 4, name: "Cuentas de vidrio", material: "Vidrio", category: "Materiales", price: 500, stock: 100, minStock: 20 },
  { id: 5, name: "Hilos de nylon", material: "Nylon", category: "Materiales", price: 300, stock: 50, minStock: 10 },
  { id: 6, name: "Collar corto", material: "Acero", category: "Collares", price: 18000, stock: 25, minStock: 8 },
  { id: 7, name: "Aretes argolla", material: "Acero", category: "Aretes", price: 12000, stock: 3, minStock: 10 },
  { id: 8, name: "Pulsera pandora", material: "Plata", category: "Pulseras", price: 55000, stock: 8, minStock: 5 },
  { id: 9, name: "Dijes decorativos", material: "Varios", category: "Dijes", price: 3500, stock: 200, minStock: 50 },
  { id: 10, name: "Tobillera", material: "Hilos", category: "Tobilleras", price: 12000, stock: 12, minStock: 5 },
  { id: 11, name: "Cadena para-collar", material: "Plata", category: "Materiales", price: 8000, stock: 40, minStock: 15 },
  { id: 12, name: "Broches", material: "Acero", category: "Accesorios", price: 2000, stock: 150, minStock: 30 },
];

/** @type {Sale[]} */
let sales = [
  { id: 1, productId: 1, productName: "Collar de perlas", quantity: 2, unitPrice: 45000, total: 90000, date: "2026-03-15" },
  { id: 2, productId: 2, productName: "Aretes artesanales", quantity: 1, unitPrice: 25000, total: 25000, date: "2026-03-15" },
  { id: 3, productId: 3, productName: "Pulsera de di", quantity: 3, unitPrice: 15000, total: 45000, date: "2026-03-14" },
];

/** @type {number} */
let nextProductId = 13;
/** @type {number} */
let nextSaleId = 4;

/**
 * @returns {Product[]}
 */
export const getAllProducts = () => [...products];

/**
 * @param {number} id
 * @returns {Product | undefined}
 */
export const getProductById = (id) => products.find(p => p.id === id);

/**
 * @param {Omit<Product, 'id'>} data
 * @returns {Product}
 */
export const createProduct = (data) => {
  const product = { ...data, id: nextProductId++ };
  products.push(product);
  return product;
};

/**
 * @param {number} id
 * @param {Partial<Product>} data
 * @returns {Product | null}
 */
export const updateProduct = (id, data) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...data };
  return products[index];
};

/**
 * @param {number} id
 * @returns {boolean}
 */
export const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};

/**
 * @returns {Sale[]}
 */
export const getAllSales = () => [...sales];

/**
 * @param {number} id
 * @returns {Sale | undefined}
 */
export const getSaleById = (id) => sales.find(s => s.id === id);

/**
 * @param {Omit<Sale, 'id'>} data
 * @returns {Sale}
 */
export const createSale = (data) => {
  const sale = { ...data, id: nextSaleId++ };
  sales.push(sale);
  return sale;
};

/**
 * @param {number} id
 * @returns {boolean}
 */
export const deleteSale = (id) => {
  const index = sales.findIndex(s => s.id === id);
  if (index === -1) return false;
  sales.splice(index, 1);
  return true;
};
