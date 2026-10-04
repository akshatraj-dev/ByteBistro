export type Category = 'Fast Food' | 'Healthy' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  calories: number;
  prepTime: string;
  rating: number;
  tags: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  estimatedTime: number; // minutes
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  maxStock: number;
  unit: string;
  category: Category;
}

export type View = 'customer' | 'dashboard';
