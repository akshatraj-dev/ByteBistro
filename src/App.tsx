import { useState, useEffect } from 'react';
import type { View, Order, OrderStatus } from '@/types';
import { CustomerPortal } from '@/components/CustomerPortal';
import { RestaurantDashboard } from '@/components/RestaurantDashboard';
import { useOrders } from '@/hooks/useOrders';

function App() {
  const [view, setView] = useState<View>('customer');
  const { orders, addOrder, updateOrderStatus } = useOrders();

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const handleOrderPlaced = (order: Order) => {
    addOrder(order);
  };

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
  };

  if (view === 'dashboard') {
    return (
      <RestaurantDashboard
        orders={orders}
        onStatusChange={handleStatusChange}
        onSwitchView={() => setView('customer')}
      />
    );
  }

  return (
    <CustomerPortal
      onOrderPlaced={handleOrderPlaced}
      onSwitchView={() => setView('dashboard')}
    />
  );
}

export default App;
