import { useState, useMemo } from 'react';
import { ShoppingBag, Search, Utensils, Heart, Cookie, Zap, ShoppingCart } from 'lucide-react';
import type { Category, MenuItem, Order, CartItem } from '@/types';
import { MENU_ITEMS, generateOrder } from '@/data';
import { useCart } from '@/hooks/useCart';
import { MenuCard } from '@/components/MenuCard';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';

interface CustomerPortalProps {
  onOrderPlaced: (order: Order) => void;
  onSwitchView: () => void;
}

const CATEGORIES: { label: Category | 'All'; icon: typeof Utensils }[] = [
  { label: 'All', icon: Utensils },
  { label: 'Fast Food', icon: Zap },
  { label: 'Healthy', icon: Heart },
  { label: 'Desserts', icon: Cookie },
];

export function CustomerPortal({ onOrderPlaced, onSwitchView }: CustomerPortalProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, subtotal } = useCart();

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
  };

  const handleCheckoutComplete = (customerName: string, address: string) => {
    const orderItems = cart.map((c: CartItem) => ({
      id: c.item.id,
      name: c.item.name,
      price: c.item.price,
      quantity: c.quantity,
      image: c.item.image,
    }));
    const order = generateOrder(orderItems, Math.round(subtotal + 40 + subtotal * 0.05));
    order.customerName = customerName;
    order.customerAddress = address;
    onOrderPlaced(order);
    clearCart();
    setCheckoutOpen(false);
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center shadow-md shadow-primary-500/30">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-neutral-900">ByteBistro</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onSwitchView}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Restaurant Dashboard
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/30 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 text-neutral-900 text-xs font-bold rounded-full flex items-center justify-center animate-pop">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-500 to-primary-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-52 h-52 bg-accent-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              Free delivery on orders over ₹500
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
              Delicious food, delivered to your door
            </h1>
            <p className="text-white/80 mt-3 text-base sm:text-lg leading-relaxed">
              Order from your favorite kitchen. Fresh ingredients, bold flavors, ready in minutes.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              <div>
                <p className="font-display text-2xl font-bold text-white">12+</p>
                <p className="text-white/70 text-sm">Menu Items</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="font-display text-2xl font-bold text-white">15 min</p>
                <p className="text-white/70 text-sm">Avg. Prep Time</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="font-display text-2xl font-bold text-white">4.8★</p>
                <p className="text-white/70 text-sm">Avg. Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === label
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-neutral-300" />
            </div>
            <p className="font-display text-lg font-semibold text-neutral-700">No dishes found</p>
            <p className="text-sm text-neutral-400 mt-1">Try a different search or category.</p>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        subtotal={subtotal}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        subtotal={subtotal}
        onComplete={handleCheckoutComplete}
      />
    </div>
  );
}
