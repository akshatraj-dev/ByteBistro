import { useMemo, useState, useEffect } from 'react';
import { Utensils, ClipboardList, IndianRupee, Clock, TrendingUp, AlertTriangle, ArrowLeft } from 'lucide-react';
import type { Order, OrderStatus, InventoryItem } from '@/types';
import { INITIAL_INVENTORY } from '@/data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { OrderCard } from '@/components/OrderCard';
import { InventoryChart } from '@/components/InventoryChart';

interface RestaurantDashboardProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  onSwitchView: () => void;
}

const STATUS_TABS: { label: string; status: OrderStatus | 'active'; icon: typeof Clock }[] = [
  { label: 'Active', status: 'active', icon: Clock },
  { label: 'Pending', status: 'pending', icon: AlertTriangle },
  { label: 'Preparing', status: 'preparing', icon: Utensils },
  { label: 'Ready', status: 'ready', icon: TrendingUp },
  { label: 'Completed', status: 'completed', icon: ClipboardList },
];

export function RestaurantDashboard({ orders, onStatusChange, onSwitchView }: RestaurantDashboardProps) {
  const [activeTab, setActiveTab] = useState<OrderStatus | 'active'>('active');
  const [inventory] = useLocalStorage<InventoryItem[]>('bytebistro_inventory', INITIAL_INVENTORY);
  const [pulseNew, setPulseNew] = useState(false);

  const prevOrderCount = useMemo(() => orders.length, []);
  useEffect(() => {
    if (orders.length > prevOrderCount) {
      setPulseNew(true);
      const t = setTimeout(() => setPulseNew(false), 1500);
      return () => clearTimeout(t);
    }
  }, [orders.length, prevOrderCount]);

  const stats = useMemo(() => {
    const activeOrders = orders.filter((o) => o.status === 'pending' || o.status === 'preparing' || o.status === 'ready');
    const revenue = orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
    const avgTime = orders.length > 0
      ? Math.round(orders.reduce((s, o) => s + o.estimatedTime, 0) / orders.length)
      : 0;
    const lowStock = inventory.filter((i) => (i.stock / i.maxStock) * 100 < 25).length;

    return {
      activeOrders: activeOrders.length,
      revenue,
      avgTime,
      lowStock,
      totalOrders: orders.length,
    };
  }, [orders, inventory]);

  const filteredOrders = useMemo(() => {
    if (activeTab === 'active') {
      return orders.filter((o) => o.status === 'pending' || o.status === 'preparing' || o.status === 'ready');
    }
    return orders.filter((o) => o.status === activeTab);
  }, [orders, activeTab]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    STATUS_TABS.forEach((tab) => {
      if (tab.status === 'active') {
        counts['active'] = orders.filter((o) => o.status === 'pending' || o.status === 'preparing' || o.status === 'ready').length;
      } else {
        counts[tab.status] = orders.filter((o) => o.status === tab.status).length;
      }
    });
    return counts;
  }, [orders]);

  const statCards = [
    {
      label: 'Active Orders',
      value: stats.activeOrders,
      icon: ClipboardList,
      color: 'text-primary-600',
      bg: 'bg-primary-50',
      ring: 'ring-primary-200',
    },
    {
      label: 'Revenue Today',
      value: `₹${Math.round(stats.revenue)}`,
      icon: IndianRupee,
      color: 'text-success-600',
      bg: 'bg-success-50',
      ring: 'ring-success-200',
    },
    {
      label: 'Avg. Prep Time',
      value: `${stats.avgTime} min`,
      icon: Clock,
      color: 'text-warning-600',
      bg: 'bg-warning-50',
      ring: 'ring-warning-200',
    },
    {
      label: 'Low Stock Items',
      value: stats.lowStock,
      icon: AlertTriangle,
      color: stats.lowStock > 0 ? 'text-error-600' : 'text-neutral-500',
      bg: stats.lowStock > 0 ? 'bg-error-50' : 'bg-neutral-50',
      ring: stats.lowStock > 0 ? 'ring-error-200' : 'ring-neutral-200',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-neutral-900">ByteBistro</span>
                <span className="ml-2 text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">Kitchen</span>
              </div>
            </div>
            <button
              onClick={onSwitchView}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Store
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-neutral-900">Restaurant Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Monitor orders and inventory in real-time</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className={`bg-white rounded-2xl border border-neutral-200/60 p-4 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ring-1 ${stat.ring} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="font-display text-2xl font-bold text-neutral-900 mt-3">{stat.value}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content: Orders + Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Column (2/3) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden">
              {/* Tabs */}
              <div className="flex items-center gap-1 px-4 pt-4 border-b border-neutral-200 overflow-x-auto scrollbar-hide">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.status}
                    onClick={() => setActiveTab(tab.status)}
                    className={`relative flex items-center gap-2 px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                      activeTab === tab.status
                        ? 'text-primary-600 border-primary-500'
                        : 'text-neutral-400 border-transparent hover:text-neutral-700'
                    }`}
                  >
                    {tab.label}
                    {tabCounts[tab.status] !== undefined && tabCounts[tab.status] > 0 && (
                      <span className={`px-1.5 py-0.5 text-xs font-bold rounded-md ${
                        activeTab === tab.status ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {tabCounts[tab.status]}
                      </span>
                    )}
                    {tab.status === 'active' && pulseNew && (
                      <span className="absolute top-1 right-0 w-2 h-2 rounded-full bg-success-500 animate-ping" />
                    )}
                  </button>
                ))}
              </div>

              {/* Order List */}
              <div className="p-4 max-h-[600px] overflow-y-auto scrollbar-thin">
                {filteredOrders.length > 0 ? (
                  <div className="space-y-3">
                    {filteredOrders
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .map((order) => (
                        <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                      <ClipboardList className="w-8 h-8 text-neutral-300" />
                    </div>
                    <p className="font-display text-base font-semibold text-neutral-700">No orders here</p>
                    <p className="text-sm text-neutral-400 mt-1">New orders will appear in real-time.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Inventory Column (1/3) */}
          <div className="space-y-4">
            <InventoryChart inventory={inventory} />
          </div>
        </div>
      </div>
    </div>
  );
}
