import { create } from 'zustand';

interface CryptoState {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

const useCryptoStore = create<CryptoState>((set) => ({
  favorites: [],
  addFavorite: (id: string) => set((state) => ({ favorites: [...state.favorites, id] })),
  removeFavorite: (id: string) => set((state) => ({ 
    favorites: state.favorites.filter((fav: string) => fav !== id) 
  })),
}));

export default useCryptoStore;
