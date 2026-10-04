import { Clock, MapPin } from 'lucide-react';
import type { Order, OrderStatus } from '@/types';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; border: string; dot: string }> = {
  pending: {
    label: 'Pending',
    color: 'text-warning-600',
    bg: 'bg-warning-50',
    border: 'border-warning-200',
    dot: 'bg-warning-500',
  },
  preparing: {
    label: 'Preparing',
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    dot: 'bg-primary-500',
  },
  ready: {
    label: 'Ready',
    color: 'text-success-600',
    bg: 'bg-success-50',
    border: 'border-success-200',
    dot: 'bg-success-500',
  },
  completed: {
    label: 'Completed',
    color: 'text-neutral-500',
    bg: 'bg-neutral-100',
    border: 'border-neutral-200',
    dot: 'bg-neutral-400',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-error-600',
    bg: 'bg-error-50',
    border: 'border-error-200',
    dot: 'bg-error-500',
  },
};

const STATUS_FLOW: { status: OrderStatus; label: string }[] = [
  { status: 'pending', label: 'Start Preparing' },
  { status: 'preparing', label: 'Mark Ready' },
  { status: 'ready', label: 'Complete Order' },
  { status: 'completed', label: 'Done' },
];

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const config = STATUS_CONFIG[order.status];
  const currentStepIndex = STATUS_FLOW.findIndex((s) => s.status === order.status);
  const nextStep = currentStepIndex >= 0 && currentStepIndex < STATUS_FLOW.length - 1 ? STATUS_FLOW[currentStepIndex + 1] : null;

  return (
    <div className={`rounded-xl border ${config.border} ${config.bg} p-4 animate-slide-up transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-neutral-900">{order.orderNumber}</span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.color} border ${config.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${order.status === 'pending' || order.status === 'preparing' ? 'animate-pulse' : ''}`} />
              {config.label}
            </span>
          </div>
          <p className="text-sm text-neutral-600 mt-0.5">{order.customerName}</p>
        </div>
        <div className="text-right">
          <span className="font-display text-lg font-bold text-neutral-900">₹{order.total}</span>
          <p className="text-xs text-neutral-400 flex items-center gap-1 justify-end mt-0.5">
            <Clock className="w-3 h-3" />
            {formatTimeAgo(order.createdAt)}
          </p>
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 text-sm">
            <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
            <span className="flex-1 text-neutral-700 truncate">{item.name}</span>
            <span className="text-neutral-400">×{item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 text-xs text-neutral-400 mb-3">
        <MapPin className="w-3 h-3 flex-shrink-0" />
        <span className="truncate">{order.customerAddress}</span>
      </div>

      {order.status !== 'completed' && order.status !== 'cancelled' && nextStep && (
        <button
          onClick={() => onStatusChange(order.id, nextStep.status)}
          className="w-full py-2.5 bg-white border border-neutral-200 hover:border-primary-400 hover:bg-primary-50 text-neutral-700 hover:text-primary-600 text-sm font-semibold rounded-lg transition-all duration-200 active:scale-[0.98]"
        >
          {nextStep.label}
        </button>
      )}
      {order.status === 'pending' && (
        <button
          onClick={() => onStatusChange(order.id, 'cancelled')}
          className="w-full py-2 mt-2 text-xs text-neutral-400 hover:text-error-500 transition-colors"
        >
          Cancel Order
        </button>
      )}
    </div>
  );
}
