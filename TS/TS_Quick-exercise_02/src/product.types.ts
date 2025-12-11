export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Utility Types
export type ProductUpdate = Partial<Product>;
export type CreateProductData = Omit<Product, "id" | "createdAt" | "updatedAt">;
export type ProductSummary = Pick<Product, "id" | "name" | "price" | "inStock">;
export type ReadonlyProduct = Readonly<Product>;
