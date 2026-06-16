import { createContext, useContext, useReducer, useEffect } from "react";
import { getCartFromStorage, saveCartToStorage } from "../utils/localStorage";
import type { CartItem, Product } from "../types/index";
interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        const currentQuantity = typeof existing.quantity === "number" ? existing.quantity : 0;
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: currentQuantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "UPDATE_QUANTITY":
      return {
        items: state.items.flatMap((i) =>
          i.id === action.payload.id
            ? action.payload.quantity > 0
              ? [{ ...i, quantity: action.payload.quantity }]
              : []
            : [i]
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
};

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: getCartFromStorage(),
  });

  useEffect(() => {
    saveCartToStorage(state.items);
  }, [state.items]);

  const addToCart = (product: Product) =>
    dispatch({ type: "ADD_ITEM", payload: product });

  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};