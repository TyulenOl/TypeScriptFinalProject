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
    getFavoritesProducts(): number[] {
      return [...this.favorites]
    }
  },
  actions: {
    deleteFavoriteProduct(id: number): void {
      this.favorites.splice(this.favorites.indexOf(id), 1)
    },

    addFavoriteProduct(id: number): void {
      this.favorites.push(id)
    }
  }
})