import type { MenuItem, InventoryItem, Order } from '@/types';

export const MENU_ITEMS: MenuItem[] = [
  // Fast Food
  {
    id: 'm1',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty, melted cheddar, crisp lettuce, and house sauce on a toasted brioche bun.',
    price: 249,
    category: 'Fast Food',
    image: 'https://images.pexels.com/photos/8305726/pexels-photo-8305726.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 650,
    prepTime: '12 min',
    rating: 4.8,
    tags: ['Bestseller', 'Beef'],
  },
  {
    id: 'm2',
    name: 'Double Smash Burger',
    description: 'Two smashed beef patties, double cheese, caramelized onions, and pickles.',
    price: 329,
    category: 'Fast Food',
    image: 'https://images.pexels.com/photos/5374419/pexels-photo-5374419.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 890,
    prepTime: '15 min',
    rating: 4.9,
    tags: ['New', 'Double'],
  },
  {
    id: 'm3',
    name: 'Pepperoni Pizza Slice',
    description: 'Wood-fired slice loaded with mozzarella, pepperoni, and a tangy tomato base.',
    price: 179,
    category: 'Fast Food',
    image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 380,
    prepTime: '10 min',
    rating: 4.7,
    tags: ['Popular'],
  },
  {
    id: 'm4',
    name: 'Loaded Fries',
    description: 'Golden crispy fries topped with melted cheese, bacon bits, and scallions.',
    price: 159,
    category: 'Fast Food',
    image: 'https://images.pexels.com/photos/29150162/pexels-photo-29150162.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 520,
    prepTime: '8 min',
    rating: 4.6,
    tags: ['Sides'],
  },
  {
    id: 'm5',
    name: 'Crispy Chicken Wings',
    description: 'Eight golden-fried chicken wings tossed in your choice of buffalo, BBQ, or garlic parmesan.',
    price: 299,
    category: 'Fast Food',
    image: 'https://images.pexels.com/photos/5652266/pexels-photo-5652266.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 710,
    prepTime: '14 min',
    rating: 4.8,
    tags: ['Spicy', 'Wings'],
  },

  // Healthy
  {
    id: 'm6',
    name: 'Power Greens Salad',
    description: 'Mixed greens, grilled chicken, cherry tomatoes, nuts, and mozzarella with a light vinaigrette.',
    price: 279,
    category: 'Healthy',
    image: 'https://images.pexels.com/photos/842545/pexels-photo-842545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 340,
    prepTime: '7 min',
    rating: 4.7,
    tags: ['Protein', 'Low-cal'],
  },
  {
    id: 'm7',
    name: 'Açaí Smoothie Bowl',
    description: 'Blended açaí topped with banana, chia seeds, granola, and coconut flakes.',
    price: 219,
    category: 'Healthy',
    image: 'https://images.pexels.com/photos/2173772/pexels-photo-2173772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 290,
    prepTime: '5 min',
    rating: 4.9,
    tags: ['Vegan', 'Breakfast'],
  },
  {
    id: 'm8',
    name: 'Grilled Salmon Plate',
    description: 'Fire-grilled salmon with roasted seasonal vegetables and a lemon herb drizzle.',
    price: 449,
    category: 'Healthy',
    image: 'https://images.pexels.com/photos/14515103/pexels-photo-14515103.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 420,
    prepTime: '18 min',
    rating: 4.9,
    tags: ['Omega-3', 'Premium'],
  },
  {
    id: 'm9',
    name: 'Veggie Buddha Bowl',
    description: 'Avocado, corn, black beans, quinoa, and cheese over a bed of greens.',
    price: 249,
    category: 'Healthy',
    image: 'https://images.pexels.com/photos/6065181/pexels-photo-6065181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 380,
    prepTime: '10 min',
    rating: 4.6,
    tags: ['Vegetarian', 'Quinoa'],
  },

  // Desserts
  {
    id: 'm10',
    name: 'Chocolate Strawberry Cake',
    description: 'Rich layered chocolate cake topped with fresh strawberries and chocolate ganache.',
    price: 179,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/12927134/pexels-photo-12927134.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 480,
    prepTime: '3 min',
    rating: 4.9,
    tags: ['Bestseller', 'Chocolate'],
  },
  {
    id: 'm11',
    name: 'Berry Ice Cream Sundae',
    description: 'Creamy berry ice cream with a waffle cone, whipped cream, and sprinkles.',
    price: 149,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/1352282/pexels-photo-1352282.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 350,
    prepTime: '2 min',
    rating: 4.7,
    tags: ['Cold', 'Berry'],
  },
  {
    id: 'm12',
    name: 'Strawberry Cheesecake',
    description: 'New York-style cheesecake topped with glazed strawberries on a graham crust.',
    price: 169,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/15030594/pexels-photo-15030594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    calories: 410,
    prepTime: '3 min',
    rating: 4.8,
    tags: ['Classic'],
  },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv1', name: 'Beef Patties', stock: 45, maxStock: 100, unit: 'pcs', category: 'Fast Food' },
  { id: 'inv2', name: 'Pizza Dough', stock: 30, maxStock: 80, unit: 'pcs', category: 'Fast Food' },
  { id: 'inv3', name: 'Chicken Wings', stock: 60, maxStock: 120, unit: 'pcs', category: 'Fast Food' },
  { id: 'inv4', name: 'Potatoes', stock: 25, maxStock: 90, unit: 'kg', category: 'Fast Food' },
  { id: 'inv5', name: 'Fresh Greens', stock: 18, maxStock: 50, unit: 'kg', category: 'Healthy' },
  { id: 'inv6', name: 'Salmon Fillets', stock: 12, maxStock: 40, unit: 'pcs', category: 'Healthy' },
  { id: 'inv7', name: 'Açaí Pack', stock: 35, maxStock: 60, unit: 'packs', category: 'Healthy' },
  { id: 'inv8', name: 'Cake Bases', stock: 8, maxStock: 30, unit: 'pcs', category: 'Desserts' },
  { id: 'inv9', name: 'Ice Cream Tub', stock: 22, maxStock: 40, unit: 'tubs', category: 'Desserts' },
  { id: 'inv10', name: 'Cheesecake', stock: 15, maxStock: 25, unit: 'pcs', category: 'Desserts' },
];

const CUSTOMER_NAMES = [
  'Sarah Mitchell', 'James Carter', 'Emma Rodriguez', 'Liam Thompson',
  'Olivia Chen', 'Noah Patel', 'Ava Williams', 'Ethan Brooks',
  'Isabella Garcia', 'Mason Lee',
];

const ADDRESSES = [
  '123 Maple Street, Downtown', '456 Oak Avenue, Westside',
  '789 Pine Lane, Eastside', '321 Cedar Blvd, Uptown',
  '654 Birch Road, Midtown', '987 Elm Court, Southside',
];

export function generateOrder(orderItems: { id: string; name: string; price: number; quantity: number; image: string }[], total: number): Order {
  const nameIdx = Math.floor(Math.random() * CUSTOMER_NAMES.length);
  const addrIdx = Math.floor(Math.random() * ADDRESSES.length);
  const orderNum = `BB-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  return {
    id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    orderNumber: orderNum,
    customerName: CUSTOMER_NAMES[nameIdx],
    customerAddress: ADDRESSES[addrIdx],
    items: orderItems,
    total,
    status: 'pending',
    createdAt: Date.now(),
    estimatedTime: Math.max(15, orderItems.reduce((s, i) => s + i.quantity * 5, 0)),
  };
}

export function generateSeedOrders(): Order[] {
  const now = Date.now();
  return [
    {
      id: 'seed-1',
      orderNumber: 'BB-1042',
      customerName: 'Sarah Mitchell',
      customerAddress: '123 Maple Street, Downtown',
      items: [
        { id: 'm1', name: 'Classic Cheeseburger', price: 249, quantity: 2, image: MENU_ITEMS[0].image },
        { id: 'm4', name: 'Loaded Fries', price: 159, quantity: 1, image: MENU_ITEMS[3].image },
      ],
      total: 657,
      status: 'preparing',
      createdAt: now - 1000 * 60 * 6,
      estimatedTime: 22,
    },
    {
      id: 'seed-2',
      orderNumber: 'BB-1041',
      customerName: 'Liam Thompson',
      customerAddress: '654 Birch Road, Midtown',
      items: [
        { id: 'm8', name: 'Grilled Salmon Plate', price: 449, quantity: 1, image: MENU_ITEMS[7].image },
        { id: 'm12', name: 'Strawberry Cheesecake', price: 169, quantity: 1, image: MENU_ITEMS[11].image },
      ],
      total: 618,
      status: 'ready',
      createdAt: now - 1000 * 60 * 14,
      estimatedTime: 21,
    },
    {
      id: 'seed-3',
      orderNumber: 'BB-1040',
      customerName: 'Emma Rodriguez',
      customerAddress: '789 Pine Lane, Eastside',
      items: [
        { id: 'm3', name: 'Pepperoni Pizza Slice', price: 179, quantity: 3, image: MENU_ITEMS[2].image },
      ],
      total: 537,
      status: 'pending',
      createdAt: now - 1000 * 60 * 2,
      estimatedTime: 30,
    },
    {
      id: 'seed-4',
      orderNumber: 'BB-1039',
      customerName: 'Noah Patel',
      customerAddress: '321 Cedar Blvd, Uptown',
      items: [
        { id: 'm7', name: 'Açaí Smoothie Bowl', price: 219, quantity: 2, image: MENU_ITEMS[6].image },
        { id: 'm6', name: 'Power Greens Salad', price: 279, quantity: 1, image: MENU_ITEMS[5].image },
      ],
      total: 717,
      status: 'completed',
      createdAt: now - 1000 * 60 * 35,
      estimatedTime: 17,
    },
  ];
}
