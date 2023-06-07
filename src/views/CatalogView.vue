<template>
  <select-sort :options="options" v-model:currentSortType="currentSortType"/>
  <div class="products">
    <product-card v-for="product in sortedProducts" :key="product.id" :product="product"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import axios from "axios";
import {IProduct} from "@/interfaces/product";
import SelectSort from "@/components/SelectSort.vue";
import {ISortOption} from "@/interfaces/sortOption";

export default defineComponent({
  components: {
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

    const products = reactive<{ data: IProduct[] }>({data: []});
    const currentSortType = ref<'price' | 'title' | null>(null);
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

    onMounted(async () => {
      await getProducts();
    });

    return {
      currentSortType,
      options,
      sortedProducts,
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
