import { useLocalStorage } from './useLocalStorage';
import type { CartItem, MenuItem } from '@/types';

const CART_KEY = 'bytebistro_cart';

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartItem[]>(CART_KEY, []);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((c) => (c.item.id === itemId ? { ...c, quantity } : c))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0);
  const subtotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal };
}
