<template>
  <search-input v-model:text="searchText"/>
  <div class="catalog-container" v-if="filteredProductsByCategories.length">
    <div class="left-side">
      <div class="sticky">
        <select-sort :options="sortingOptions" v-model:currentSortType="currentSortType"/>
        <categories v-model:chosenCategories="chosenCategories" :options="categoriesOptions"/>
      </div>
    </div>
    <div class="middle-part">
      <product-card v-for="product in filteredProductsByCategories" :key="product.id" :product="product"/>
    </div>
    <div class="right-part">
      <button class="cart__button" @click="showCart = !showCart">
        <img class="cart__image" :src="require('@/assets/images/cart.svg')" alt="">
      </button>
      <div v-if="showCart">
        <div v-if="cartStore.getProducts.length">
          <product-card-in-cart v-for="product in cartStore.getProducts" :key="product.id" :product="product"
                                :count="product.count"/>
          <p class="cart__text">Общая сумма: $ {{ totalAmount }}</p>
        </div>
        <p v-else class="cart__text">Корзина пока пуста</p>
      </div>
    </div>
  </div>
  <loading v-else/>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import axios from "axios";
import {IProduct} from "@/interfaces/product";
import SelectSort from "@/components/SelectSort.vue";
import {ISortOption} from "@/interfaces/sortOption";
import CustomInput from "@/UI/SearchInput.vue";
import SearchInput from "@/UI/SearchInput.vue";
import {useFavoritesStore} from "@/pinia/favorites";
import Categories from "@/components/Categories.vue";
import {useCartStore} from "@/pinia/cart";
import ProductCardInCart from "@/components/ProductCardInCart.vue";

export default defineComponent({
  components: {
    ProductCardInCart,
    Categories,
    SearchInput,
    CustomInput,
    ProductCard,
    SelectSort,
  },
  setup() {
    async function getProducts(): Promise<void> {
      try {
        const response = await axios.get<IProduct[]>("https://fakestoreapi.com/products");
        if (response.status == 200) {
          products.data = response.data;
        }
      } catch (e) {
        console.error(e);
      }
    }

    const categoriesOptions = computed<string[]>(() => {
      const categories = Array.from(new Set(filteredBySearchProducts.value.map(product => product.category)
          .sort((srt1, srt2) => srt1.localeCompare(srt2))));
      return favoritesStore.getFavorites.length ? [...categories, 'favorites'] : categories;
    });

    const sortedProducts = computed<IProduct[]>(() => {
      if (!currentSortType.value) return products.data;
      return [...products.data].sort((prod1, prod2) => {
        return currentSortType.value
            ? String(prod1[currentSortType.value]).localeCompare(String(prod2[currentSortType.value]), 'en', {numeric: true})
            : 0;
      });
    });

    const filteredBySearchProducts = computed<IProduct[]>(() => {
      return sortedProducts.value
          .filter(product => product.title.toLowerCase().includes(searchText.value.toLowerCase().trim()));
    });

    const filteredProductsByCategories = computed<IProduct[]>(() => {
      if (!chosenCategories.value.length) return filteredBySearchProducts.value;
      return filteredBySearchProducts.value.filter((product) => {
        return chosenCategories.value.includes('favorites')
            ? chosenCategories.value.includes(product.category) || favoritesStore.getFavorites.includes(product.id)
            : chosenCategories.value.includes(product.category);
      });
    });

    const totalAmount = computed(() => {
      return cartStore.getProducts.reduce((sum, cur) => sum + (cur.price * cur.count), 0).toFixed(2);
    });

    const totalProductsInCart = computed(() => {
      const result = cartStore.getProducts.reduce((sum, cur) => sum + cur.count, 0);
      if (result)
        return `'${result}'`;
      else
        return;
    });

    const pageCount = computed(() => {
      return Math.ceil(filteredProductsByCategories.value.length / limit.value);
    });

    const limit = ref<number>(10);
    const activePage = ref<number>(1);
    const showCart = ref<boolean>(false);
    const searchText = ref<string>("");
    const chosenCategories = ref<string[]>([]);
    const currentSortType = ref<'price' | 'title' | null>(null);
    const products = reactive<{ data: IProduct[] }>({data: []});
    const favoritesStore = useFavoritesStore();
    const cartStore = useCartStore();
    const sortingOptions = reactive<ISortOption[]>([{
      value: 'price',
      name: 'По цене'
    }, {
      value: 'title',
      name: 'По алфавиту'
    }]);


    onMounted(() => {
          getProducts();

          if (localStorage.getItem('favoritesProducts')) {
            const storedFavoritesProducts = localStorage.getItem('favoritesProducts');
            if (typeof storedFavoritesProducts === 'string')
              favoritesStore.favorites = JSON.parse(storedFavoritesProducts);
          }
        }
    );

    return {
      searchText,
      currentSortType,
      sortingOptions,
      filteredProductsByCategories,
      chosenCategories,
      categoriesOptions,
      cartStore,
      totalAmount,
      showCart,
      totalProductsInCart,
    };
  }
});
</script>

<style scoped>
.catalog-container {
  display: grid;
  grid-template-columns: auto auto auto;
}

.left-side {
  max-width: 224px;
  margin-right: 16px;
}

.sticky {
  position: sticky;
  top: 16px;
  display: flex;
  flex-direction: column;
}

.middle-part {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}

.right-part {
  display: flex;
  flex-direction: column;
  margin-left: 16px;
}

.cart__button {
  background: none;
  border: none;
  align-self: end;
}

.cart__image {
  width: 32px;
  height: 32px;
}

.cart__button::after {
  content: v-bind(totalProductsInCart);
  font-size: 12px;
  position: relative;
  color: #FFFFFF;
  border-radius: 50%;
  padding: 2px 5px;
  background: #E5252C;
  left: -10px;
  top: -25px;
  opacity: 1;
}

.cart__text {
  background: #FFFFFF;
  padding: 8px 12px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
  margin-top: 26px;
}
</style>
