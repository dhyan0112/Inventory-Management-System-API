import { ProductService } from "../services/productService.js";

export const ProductController = {
  getAll: (req, res) => {
    res.json(ProductService.getAll());
  },

  getById: (req, res) => {
    try {
      const product = ProductService.getById(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  create: (req, res) => {
    try {
      const product = ProductService.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  update: (req, res) => {
    try {
      const updated = ProductService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  delete: (req, res) => {
    try {
      ProductService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  increase: (req, res) => {
    try {
      const updated = ProductService.increaseStock(req.params.id, req.body.amount);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  decrease: (req, res) => {
    try {
      const updated = ProductService.decreaseStock(req.params.id, req.body.amount);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  lowStock: (req, res) => {
    res.json(ProductService.getLowStock());
  },
};