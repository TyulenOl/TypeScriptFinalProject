<template>
  <router-link class="product" :to="`/product/${product.id}`">
    <div class="product__top-part">
      <img class="product__image" :src="product.image" alt="">
      <h3 class="product__title">{{ product.title }}</h3>
    </div>
    <div class="product__bottom-part">
      <div class="product__statistics">
        <rating :rate="product.rating.rate"/>
        <span class="rating__reviews">{{ product.rating.count }} отзывов</span>
      </div>
      <div class="product__price-and-cart">
        <p class="product__price">$ {{ product.price }}</p>
        <add-to-cart-button/>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {IProduct} from "@/interfaces/product";

export default defineComponent({
  name: "ProductCard",
  components: {},

  props: {
    product: {required: true, type: Object as PropType<IProduct>}
  },
  setup() {

  }
});
</script>

<style scoped>
.product {
  width: 324px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eee;
  border-radius: 22px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 2px 4px;
  transition: all .3s ease-in-out;
}

.product:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0 14px 34px;
  transform: translate3d(0px, -1px, 0px);
}

.product__image {
  height: 250px;
  width: 100%;
  padding: 32px;
  margin-bottom: 8px;
  background: #ffffff;
  border-radius: 22px;
  object-fit: contain;
}

.product__title {
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
  text-align: center;
  margin-bottom: 8px;
}

.product__bottom-part {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product__price {
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
}

.product__statistics {
  margin-bottom: 8px;
}

.product__price-and-cart {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>