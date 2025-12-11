import type { Product, ProductUpdate } from "./product.types.js";

// Mock Data
const products: Product[] = [
  {
    id: 1,
    name: "Laptop Gaming",
    price: 1500,
    description: "High performance",
    inStock: false,
    category: "Electronics",
    tags: ["gaming"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Helper Function
export function getProductById(id: number): Product {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`Product ID ${id} not found`);
  return product;
}

// Main Logic Function
export function updateProduct(id: number, updates: ProductUpdate): Product {
  const existing = getProductById(id);

  // Validation Logic
  if (updates.name !== undefined && updates.name.trim().length === 0) {
    throw new Error("Name cannot be empty");
  }
  if (updates.price !== undefined && updates.price < 0) {
    throw new Error("Price cannot be negative");
  }

  // Merge Data
  return {
    ...existing,
    ...updates,
    updatedAt: new Date(),
  };
}
