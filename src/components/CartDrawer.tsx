import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '@/types';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

const DELIVERY_FEE = 40;
const TAX_RATE = 0.05;

export function CartDrawer({
  open,
  onClose,
  cart,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const tax = subtotal * TAX_RATE;
  const total = subtotal + (subtotal > 0 ? DELIVERY_FEE : 0) + tax;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-neutral-50 z-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary-500" />
            <h2 className="font-display text-lg font-bold text-neutral-900">Your Cart</h2>
            {cart.length > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary-100 text-primary-600">
                {cart.reduce((s, c) => s + c.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-neutral-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-neutral-300" />
              </div>
              <p className="font-display text-lg font-semibold text-neutral-700">Your cart is empty</p>
              <p className="text-sm text-neutral-400 mt-1">Add some delicious items to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="flex gap-3 bg-white rounded-xl p-3 border border-neutral-200/60 animate-slide-in-right"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-neutral-900 truncate">{cartItem.item.name}</h4>
                    <p className="text-sm text-primary-600 font-semibold">₹{cartItem.item.price}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-primary-100 flex items-center justify-center transition-colors text-neutral-600"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-semibold text-neutral-900 w-6 text-center">{cartItem.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-primary-100 flex items-center justify-center transition-colors text-neutral-600"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(cartItem.item.id)}
                        className="ml-auto p-1.5 text-neutral-300 hover:text-error-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-neutral-900">
                      ₹{cartItem.item.price * cartItem.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-neutral-200 bg-white px-5 py-4 space-y-2">
            <div className="flex justify-between text-sm text-neutral-500">
              <span>Subtotal</span>
              <span className="font-medium text-neutral-700">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-500">
              <span>Delivery Fee</span>
              <span className="font-medium text-neutral-700">₹{DELIVERY_FEE}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-500">
              <span>Tax (5% GST)</span>
              <span className="font-medium text-neutral-700">₹{Math.round(tax)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-neutral-100">
              <span className="font-display font-bold text-neutral-900">Total</span>
              <span className="font-display font-bold text-primary-600 text-lg">₹{Math.round(total)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full mt-2 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/30 active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export { DELIVERY_FEE, TAX_RATE };
