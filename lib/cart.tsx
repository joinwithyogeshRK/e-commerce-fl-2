'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from './products';

export type CartLine = {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  qty: number;
};

type Action =
  | { type: 'add'; product: Product; color?: string }
  | { type: 'remove'; key: string }
  | { type: 'qty'; key: string; delta: number };

const key = (l: { id: string; color: string }) => `${l.id}::${l.color}`;

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'add': {
      const color = action.color ?? action.product.colors[0]?.name ?? 'Default';
      const k = key({ id: action.product.id, color });
      const existing = state.find((l) => key(l) === k);
      if (existing) {
        return state.map((l) => (key(l) === k ? { ...l, qty: l.qty + 1 } : l));
      }
      return [
        ...state,
        {
          id: action.product.id,
          name: action.product.name,
          price: action.product.price,
          image: action.product.image,
          color,
          qty: 1,
        },
      ];
    }
    case 'remove':
      return state.filter((l) => key(l) !== action.key);
    case 'qty':
      return state
        .map((l) => (key(l) === action.key ? { ...l, qty: l.qty + action.delta } : l))
        .filter((l) => l.qty > 0);
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (product: Product, color?: string) => void;
  remove: (k: string) => void;
  setQty: (k: string, delta: number) => void;
  lineKey: (l: { id: string; color: string }) => string;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);

  const add = useCallback((product: Product, color?: string) => {
    dispatch({ type: 'add', product, color });
    setOpen(true);
  }, []);

  const remove = useCallback((k: string) => dispatch({ type: 'remove', key: k }), []);
  const setQty = useCallback(
    (k: string, delta: number) => dispatch({ type: 'qty', key: k, delta }),
    []
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
      open,
      setOpen,
      add,
      remove,
      setQty,
      lineKey: key,
    }),
    [lines, open, add, remove, setQty]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

type WishlistContextValue = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const toggle = useCallback(
    (id: string) =>
      setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    []
  );
  const value = useMemo(
    () => ({ ids, toggle, has: (id: string) => ids.includes(id) }),
    [ids, toggle]
  );
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
