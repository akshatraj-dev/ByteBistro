import { useState } from 'react';
import { X, CheckCircle2, CreditCard, Loader2, MapPin } from 'lucide-react';
import type { CartItem } from '@/types';
import { DELIVERY_FEE, TAX_RATE } from './CartDrawer';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  onComplete: (customerName: string, address: string) => void;
}

export function CheckoutModal({ open, onClose, cart, subtotal, onComplete }: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + DELIVERY_FEE + tax;

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onComplete(name || 'Guest Customer', address || 'Pickup at counter');
        resetForm();
      }, 1500);
    }, 2000);
  };

  const resetForm = () => {
    setName('');
    setAddress('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
    setSuccess(false);
    setProcessing(false);
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm animate-fade-in" onClick={processing ? undefined : onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin animate-slide-up">
        {success ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-success-400 animate-pulse-ring" />
              <div className="relative w-20 h-20 rounded-full bg-success-500 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mt-6">Order Placed!</h2>
            <p className="text-neutral-500 mt-2 text-center">
              Your delicious order is on its way to the kitchen. Sit tight!
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
              <h2 className="font-display text-xl font-bold text-neutral-900">Checkout</h2>
              <button
                onClick={onClose}
                disabled={processing}
                className="p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500 disabled:opacity-40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
              {/* Delivery Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  Delivery Details
                </h3>
                <div>
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street, Apt 4B"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                  />
                </div>
              </div>

              {/* Payment Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary-500" />
                  Payment Details
                </h3>
                <div>
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-neutral-500 mb-1 block">Expiry</label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-neutral-500 mb-1 block">CVV</label>
                    <input
                      type="text"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-neutral-50 rounded-xl p-4 space-y-1.5">
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Subtotal ({cart.reduce((s, c) => s + c.quantity, 0)} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Delivery Fee</span>
                  <span>₹{DELIVERY_FEE}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Tax</span>
                  <span>₹{Math.round(tax)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-200">
                  <span className="font-display font-bold text-neutral-900">Total</span>
                  <span className="font-display font-bold text-primary-600">₹{Math.round(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/30 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay ₹${Math.round(total)}`
                )}
              </button>
              <p className="text-xs text-neutral-400 text-center">
                This is a simulated checkout. No real payment will be processed.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
