<template>
  <search-input v-model:text="searchText"/>
  <select-sort :options="options" v-model:currentSortType="currentSortType"/>
  <div class="products" v-if="sortedAndFilteredProducts">
    <product-card v-for="product in sortedAndFilteredProducts" :key="product.id" :product="product"/>
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

export default defineComponent({
  components: {
    SearchInput,
    CustomInput,
    ProductCard,
    SelectSort
  },
  setup: function () {
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

    const searchText = ref<string>("");
    const currentSortType = ref<'price' | 'title' | null>(null);
    const products = reactive<{ data: IProduct[] }>({data: []});
    const favoritesStore = useFavoritesStore();
    const options = reactive<ISortOption[]>([{
      value: 'price',
      name: 'По цене'
    }, {
      value: 'title',
      name: 'По алфавиту'
    }]);

    const sortedProducts = computed(() => {
      if (!currentSortType.value) return products.data;
      return [...products.data].sort((prod1, prod2) => {
        return currentSortType.value
            ? String(prod1[currentSortType.value]).localeCompare(String(prod2[currentSortType.value]), 'en', {numeric: true})
            : 0;
      });
    });
    const sortedAndFilteredProducts = computed(() => {
      return sortedProducts.value.filter(product => product.title.toLowerCase().includes(searchText.value.toLowerCase().trim()));
    });

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
      options,
      sortedAndFilteredProducts,
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
</style>
