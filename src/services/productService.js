import { ProductModel } from "../models/productModel.js";

export const ProductService = {
  getAll: () => ProductModel.findAll(),

  getById: (id) => {
    const product = ProductModel.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  create: ({ name, description, stock_quantity = 0, low_stock_threshold = 5 }) => {
    if (!name || stock_quantity < 0) {
      throw new Error("Invalid product data");
    }

    return ProductModel.create({ name, description, stock_quantity, low_stock_threshold });
  },

  update: (id, data) => {
    const product = ProductModel.findById(id);
    if (!product) throw new Error("Product not found");

    if (data.stock_quantity !== undefined && data.stock_quantity < 0)
      throw new Error("Stock cannot go below zero");

    return ProductModel.update(id, data);
  },

  delete: (id) => {
    if (!ProductModel.delete(id)) throw new Error("Product not found");
  },

  increaseStock: (id, amount) => {
    const product = ProductModel.findById(id);
    if (!product) throw new Error("Product not found");
    if (amount <= 0) throw new Error("Increase amount must be positive");

    return ProductModel.update(id, { stock_quantity: product.stock_quantity + amount });
  },

  decreaseStock: (id, amount) => {
    const product = ProductModel.findById(id);
    if (!product) throw new Error("Product not found");
    if (amount <= 0) throw new Error("Decrease amount must be positive");
    if (product.stock_quantity < amount) throw new Error("Insufficient stock available");

    return ProductModel.update(id, { stock_quantity: product.stock_quantity - amount });
  },

  getLowStock: () => {
    return ProductModel.findAll().filter(
      (p) => p.stock_quantity < p.low_stock_threshold
    );
  },
};