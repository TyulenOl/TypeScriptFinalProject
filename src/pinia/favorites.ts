import { defineStore } from 'pinia'

interface FavoritesState {
  favorites: number[]
}

export const useFavoritesStore = defineStore('favoritesStore', {
  state: (): FavoritesState => {
    return {
      favorites: []
    }
  },
  getters: {
    getFavorites(): number[] {
      return [...this.favorites]
    }
  },
  actions: {
    deleteFavorite(id: number): void {
      this.favorites.splice(this.favorites.indexOf(id), 1)
    },

    addFavorite(id: number): void {
      this.favorites.push(id)
    }
  }
})
