import { useLocalStorage } from './useLocalStorage';
import { generateSeedOrders } from '@/data';
import type { Order } from '@/types';

const ORDERS_KEY = 'bytebistro_orders';

export function useOrders() {
  const [orders, setOrders] = useLocalStorage<Order[]>(ORDERS_KEY, generateSeedOrders());

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return { orders, addOrder, updateOrderStatus };
}
