import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./src/routes/productRoutes.js";

const app = express();
app.use(bodyParser.json());

// Register Routes
app.use("/products", productRoutes);

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app; // for Jest tests