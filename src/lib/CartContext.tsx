
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from './types';
import { toast } from '@/components/ui/sonner';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, color: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('cart');
    }
    
    // Calculate item count and total amount
    setItemCount(items.reduce((count, item) => count + item.quantity, 0));
    setTotalAmount(items.reduce((total, item) => {
      const itemPrice = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100) 
        : item.product.price;
      return total + (itemPrice * item.quantity);
    }, 0));
  }, [items]);

  const addItem = (product: Product, quantity: number, color: string) => {
    setItems(prev => {
      // Check if item already exists in cart
      const existingItemIndex = prev.findIndex(item => item.product.id === product.id && item.color === color);
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success('Item quantity updated in cart');
        return updatedItems;
      } else {
        // Add new item
        toast.success('Item added to cart');
        return [...prev, { product, quantity, color }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => {
      const updatedItems = prev.filter(item => item.product.id !== productId);
      toast.info('Item removed from cart');
      return updatedItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prev => {
      const updatedItems = prev.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    toast.info('Cart cleared');
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
