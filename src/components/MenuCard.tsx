import { Star, Clock, Flame, Plus } from 'lucide-react';
import type { MenuItem } from '@/types';

interface MenuCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export function MenuCard({ item, onAdd }: MenuCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200/60 hover:border-primary-300 animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-white/90 backdrop-blur-sm text-primary-600 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-900/70 backdrop-blur-sm">
          <Star className="w-3 h-3 fill-accent-400 text-accent-400" />
          <span className="text-xs font-semibold text-white">{item.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-neutral-900 text-base leading-tight">{item.name}</h3>
        <p className="mt-1 text-sm text-neutral-500 line-clamp-2 leading-relaxed">{item.description}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {item.prepTime}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            {item.calories} cal
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-neutral-900">
            ₹{item.price}
          </span>
          <button
            onClick={() => onAdd(item)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md hover:shadow-primary-500/30"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
