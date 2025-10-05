# Inventory-Management-System-API

A **backend-heavy REST API** built with **Node.js + Express** for managing products in a warehouse.  
It supports full CRUD operations, stock management (increase/decrease), and low-stock alerts.  
Includes **unit tests (Jest + Supertest)** and clear modular architecture.

---

## 📁 Folder Structure

```
warehouse-api/
│
├── package.json
├── server.js
│
├── src/
│   ├── controllers/
│   │   └── productController.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── services/
│   │   └── productService.js
│   ├── models/
│   │   └── productModel.js
│   └── utils/
│       └── errorHandler.js
│
└── tests/
    └── product.test.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<dhyan0112>/Inventory-Management-System-API.git
cd Inventory-Management-System-API
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Server

```bash
npm start
```

> Server will start at:  
> 🌐 `http://localhost:3000`

---

## 🚀 API Endpoints

### 🔹 **Product CRUD**

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/products` | Create new product |
| **GET** | `/products` | Get all products |
| **GET** | `/products/:id` | Get product by ID |
| **PUT** | `/products/:id` | Update product |
| **DELETE** | `/products/:id` | Delete product |

**Example Body (POST /products):**
```json
{
  "name": "Laptop",
  "description": "Dell XPS 13",
  "stock_quantity": 10,
  "low_stock_threshold": 5
}
```

---

### 🔹 **Inventory Management**

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/products/:id/increase` | Increase stock |
| **POST** | `/products/:id/decrease` | Decrease stock (returns error if not enough stock) |
| **GET** | `/products/low-stock` | List all products below low-stock threshold |

**Example Request (Increase Stock):**
```bash
POST /products/1/increase
Content-Type: application/json

{
  "amount": 5
}
```

**Example Response:**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "Dell XPS 13",
  "stock_quantity": 15,
  "low_stock_threshold": 5
}
```

---

## 🧠 Business Logic

- Stock quantity **cannot go below zero**.
- When decreasing stock, returns **400 Bad Request** if insufficient stock.
- Supports **low-stock alert** via `/products/low-stock`.

---

## 🧪 Running Tests

The project includes **unit tests** for:
- Stock increase/decrease logic
- Validation edge cases

### Run all tests:
```bash
npm test
```

Sample Output:
```
PASS  tests/product.test.js
✓ Create product
✓ Increase stock
✓ Should not decrease below zero
✓ Low stock endpoint works
```

---

## 🧱 Technologies Used

- **Node.js** — runtime environment  
- **Express.js** — web framework  
- **Jest** — test runner  
- **Supertest** — API endpoint testing  
- **ES Modules (import/export)** — for cleaner code structure  

---

## 🧩 Example Workflow

1. **Create product** → `/products`
2. **Increase stock** → `/products/:id/increase`
3. **Decrease stock** → `/products/:id/decrease`
4. **Check low stock** → `/products/low-stock`

---

## 🧰 Developer Notes

- Currently uses **in-memory data** (`src/models/productModel.js`) for simplicity.
- Designed with **MVC architecture** and clear separation of concerns.
