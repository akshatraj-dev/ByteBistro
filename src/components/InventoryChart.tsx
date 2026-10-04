import { useState } from 'react';
import { ChevronDown, Package } from 'lucide-react';
import type { InventoryItem, Category } from '@/types';

interface InventoryChartProps {
  inventory: InventoryItem[];
}

const CATEGORY_COLORS: Record<Category, string> = {
  'Fast Food': 'bg-primary-500',
  'Healthy': 'bg-success-500',
  'Desserts': 'bg-accent-400',
};

const CATEGORY_FILTERS: ('All' | Category)[] = ['All', 'Fast Food', 'Healthy', 'Desserts'];

function getStockLevel(stock: number, maxStock: number): { label: string; color: string; textColor: string } {
  const pct = (stock / maxStock) * 100;
  if (pct < 25) return { label: 'Low', color: 'bg-error-400', textColor: 'text-error-600' };
  if (pct < 50) return { label: 'Medium', color: 'bg-warning-400', textColor: 'text-warning-600' };
  return { label: 'Good', color: 'bg-success-400', textColor: 'text-success-600' };
}

export function InventoryChart({ inventory }: InventoryChartProps) {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const [expanded, setExpanded] = useState(true);

  const filtered = filter === 'All' ? inventory : inventory.filter((i) => i.category === filter);

  const lowStock = inventory.filter((i) => (i.stock / i.maxStock) * 100 < 25).length;
  const totalItems = inventory.reduce((s, i) => s + i.stock, 0);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary-500" />
          <h2 className="font-display text-base font-bold text-neutral-900">Inventory Levels</h2>
          {lowStock > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-error-50 text-error-600 border border-error-200">
              {lowStock} low
            </span>
          )}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-400"
        >
          <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${expanded ? '' : '-rotate-90'}`} />
        </button>
      </div>

      {expanded && (
        <div className="px-5 py-4">
          {/* Filter tabs */}
          <div className="flex gap-1.5 mb-4">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === cat
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Chart bars */}
          <div className="space-y-3">
            {filtered.map((item) => {
              const pct = Math.round((item.stock / item.maxStock) * 100);
              const level = getStockLevel(item.stock, item.maxStock);
              return (
                <div key={item.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-200 flex items-center justify-center">
                        <span className={`w-1.5 h-1.5 rounded-full ${CATEGORY_COLORS[item.category]}`} />
                      </span>
                      <span className="font-medium text-neutral-700">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${level.textColor}`}>{level.label}</span>
                      <span className="text-xs text-neutral-400 tabular-nums">
                        {item.stock}/{item.maxStock} {item.unit}
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${level.color} transition-all duration-700 ease-out`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {(['Fast Food', 'Healthy', 'Desserts'] as Category[]).map((cat) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-sm ${CATEGORY_COLORS[cat]}`} />
                  <span className="text-xs text-neutral-500">{cat}</span>
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold text-neutral-400">{totalItems} total units</span>
          </div>
        </div>
      )}
    </div>
  );
}
