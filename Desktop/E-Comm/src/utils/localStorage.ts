import type { CartItem } from "../types/index";

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

export const getCartFromStorage = (): CartItem[] => {
  const cart = localStorage.getItem("cart");
  if (!cart) return [];

  try {
    const parsed = JSON.parse(cart);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item) => ({
      ...item,
      quantity:
        typeof item.quantity === "number" && item.quantity > 0
          ? item.quantity
          : 1,
    }));
  } catch {
    return [];
  }
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
