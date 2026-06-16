import api from "./api";
import type { Product } from "../types/index";

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};

export const getAllCategories = async (): Promise<string[]> => {
  const response = await api.get("/products/categories");
  return response.data;
};