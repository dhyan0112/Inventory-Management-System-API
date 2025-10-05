import request from "supertest";
import app from "../server.js";
import { ProductModel } from "../src/models/productModel.js";

beforeEach(() => ProductModel.reset());

describe("Warehouse API", () => {
  test("Create product", async () => {
    const res = await request(app).post("/products").send({
      name: "Laptop",
      description: "Test device",
      stock_quantity: 10,
      low_stock_threshold: 5,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Laptop");
  });

  test("Increase stock", async () => {
    const { body: product } = await request(app)
      .post("/products")
      .send({ name: "Phone", description: "iPhone", stock_quantity: 10 });
    const res = await request(app)
      .post(`/products/${product.id}/increase`)
      .send({ amount: 5 });
    expect(res.body.stock_quantity).toBe(15);
  });

  test("Should not decrease below zero", async () => {
    const { body: product } = await request(app)
      .post("/products")
      .send({ name: "Tablet", stock_quantity: 2 });
    const res = await request(app)
      .post(`/products/${product.id}/decrease`)
      .send({ amount: 5 });
    expect(res.statusCode).toBe(400);
  });

  test("Low stock endpoint works", async () => {
    await request(app)
      .post("/products")
      .send({ name: "TV", stock_quantity: 3, low_stock_threshold: 5 });
    const res = await request(app).get("/products/low-stock");
    expect(res.body.length).toBe(1);
  });
});