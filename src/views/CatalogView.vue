<template>
  <div class="products">
    <ProductCard v-for="product in products.data" :key="product.id" :product="product"/>
  </div>
</template>

<script lang="ts">
import {DefineComponent, defineComponent, onMounted, reactive} from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import axios from "axios";

export default defineComponent({
  components: {
    ProductCard,
  },
  setup() {
    async function getProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        if (response.status == 200) {
          products.data = response.data;
        }
      } catch (e) {
        console.error(e);
      }
    }

    const products = reactive({data: []});

    onMounted(async () => {
      await getProducts();
    });

    return {
      products,
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
