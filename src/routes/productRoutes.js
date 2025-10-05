import express from "express";
import { ProductController } from "../controllers/productController.js";

const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/low-stock", ProductController.lowStock);
router.get("/:id", ProductController.getById);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);
router.post("/:id/increase", ProductController.increase);
router.post("/:id/decrease", ProductController.decrease);

export default router;