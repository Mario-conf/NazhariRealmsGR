'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'trail-favorites';

export default function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to read favorites from localStorage', error);
      setFavorites([]);
    }
  }, []);

  const toggleFavorite = useCallback((trailId: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(trailId)
        ? prevFavorites.filter((id) => id !== trailId)
        : [...prevFavorites, trailId];
      
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      } catch (error) {
         console.error('Failed to save favorites to localStorage', error);
      }

      return newFavorites;
    });
  }, []);

  return { favorites, toggleFavorite };
}
