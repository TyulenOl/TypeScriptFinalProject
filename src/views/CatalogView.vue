<template>
  <search-input v-model:text="searchText"/>
  <div class="catalog-container" v-if="filteredProductsByCategories.length">
    <div class="left-side">
      <select-sort :options="sortingOptions" v-model:currentSortType="currentSortType"/>
      <categories v-model:chosenCategories="chosenCategories" :options="categoriesOptions"/>
    </div>
    <div class="middle-part">
      <div class="products">
        <product-card v-for="product in filteredProductsByCategories" :key="product.id" :product="product"/>
      </div>
    </div>
    <div class="right-part">

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
import {useFavoritesStore} from "@/pinia";
import Categories from "@/components/Categories.vue";

export default defineComponent({
  components: {
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
      return favoritesStore.getFavoritesProducts.length ? [...categories, 'favorites'] : categories;
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
            ? chosenCategories.value.includes(product.category) || favoritesStore.getFavoritesProducts.includes(product.id)
            : chosenCategories.value.includes(product.category);
      });
    });

    const searchText = ref<string>("");
    const chosenCategories = ref<string[]>([]);
    const currentSortType = ref<'price' | 'title' | null>(null);
    const products = reactive<{ data: IProduct[] }>({data: []});
    const favoritesStore = useFavoritesStore();
    const sortingOptions = reactive<ISortOption[]>([{
      value: 'price',
      name: 'По цене'
    }, {
      value: 'title',
      name: 'По алфавиту'
    }]);

    onMounted(async () => {
          await getProducts();

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
    };
  }
});
</script>

<style scoped>
.products {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.catalog-container {
  display: grid;
  grid-template-columns: auto auto 1fr;
}

.left-side {
  display: flex;
  flex-direction: column;
  margin-right: 32px;
}
</style>
