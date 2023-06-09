import {defineStore} from 'pinia';
import {IProduct} from "@/interfaces/product";

interface CartState {
  products: IProduct[];
}

export const useCartStore = defineStore('cartStore', {
  state: (): CartState => {
    return {
      products: []
    };
  },
  getters: {
    getProducts(): IProduct[] {
      return [...this.products];
    }
  },
  actions: {
    deleteFromCart(id: number): void {
      this.products.splice(this.products.map(prod => prod.id).indexOf(id), 1);
    },

    addToCart(product: IProduct, quantity: number): void {
      product.count = quantity;
      this.products.push(product);
    }
  }
});
