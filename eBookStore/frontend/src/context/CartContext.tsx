import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
// Hum 'BookWithDetails' aur 'CartItem' dono ko types file se import kareinge
import { BookWithDetails, CartItem } from "../types";

// Context mein yeh sab functions available honge
interface CartContextType {
  items: CartItem[];
  addToCart: (book: BookWithDetails, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State ko initialize karte waqt localStorage se purana cart load karein
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
      return [];
    }
  });

  // Jab bhi 'items' state change ho, usse localStorage mein save karein
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  // Cart mein item add karna (ya quantity barhana)
  const addToCart = (book: BookWithDetails, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.book.id === book.id);

      if (existingItem) {
        // Agar item pehle se hai, toh quantity update karo
        return prevItems.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Agar naya item hai, toh usse cart mein add karo
      return [...prevItems, { book, quantity }];
    });
  };

  // Cart se item remove karna
  const removeFromCart = (bookId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.book.id !== bookId)
    );
  };

  // Item ki quantity update karna (jaise Cart page par +/- buttons)
  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      // Agar quantity 0 ya kam ho, toh item remove kar do
      removeFromCart(bookId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  // Poora cart khali karna
  const clearCart = () => {
    setItems([]);
  };

  // Cart ki total qeemat calculate karna
  const getCartTotal = () => {
    return items.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    );
  };

  // Cart mein total items (quantity ke hisab se) count karna
  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  // Context Provider ko saari values dein
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Yeh ek custom hook hai taake CartContext ko aasani se use kar sakein
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
