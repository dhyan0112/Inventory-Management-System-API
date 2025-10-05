let products = [];
let currentId = 1;

export const ProductModel = {
  findAll: () => products,
  findById: (id) => products.find((p) => p.id === parseInt(id)),
  create: (data) => {
    const product = { id: currentId++, ...data };
    products.push(product);
    return product;
  },
  update: (id, newData) => {
    const index = products.findIndex((p) => p.id === parseInt(id));
    if (index === -1) return null;
    products[index] = { ...products[index], ...newData };
    return products[index];
  },
  delete: (id) => {
    const index = products.findIndex((p) => p.id === parseInt(id));
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  },
  reset: () => {
    products = [];
    currentId = 1;
  },
};
