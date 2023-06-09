<template>
  <div class="card__content">
    <img class="card__image" :src="product.image" alt="">
    <div class="card__right-side">
      <h3 class="card__title">{{ product.title }}</h3>
      <div class="card-wrapper">
        <rating class="rating" :rate="product.rating.rate"/>
        <span class="card__price">$ {{ product.price }} x {{ product.count }}</span>
        <input class="card__input" type="number" min="1" v-model="product.count">
      </div>
    </div>
    <button class="delete__button" @click="deleteFromCart(product.id)">
      <img :src="require('@/assets/images/delete.svg')" alt="">
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {IProduct} from "@/interfaces/product";
import {useCartStore} from "@/pinia/cart";

export default defineComponent({
  name: "ProductCardInCart",
  props: {
    product: {required: true, type: Object as PropType<IProduct>},
  },
  setup() {
    const {deleteFromCart} = useCartStore();

    return {
      deleteFromCart
    }
  }
});
</script>

<style scoped>
.card__content {
  display: flex;
  background: #FFFFFF;
  border-radius: 21px;
  padding: 16px 24px;
  max-width: 600px;
  width: inherit;
}

.card__content:not(:last-child) {
  margin-bottom: 26px;
}

.card__image {
  height: 180px;
  max-width: 200px;
  padding: 16px;
  margin-bottom: 8px;
  background: #ffffff;
  border-radius: 22px;
  object-fit: contain;
}

.card__right-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  width: 100%;
}

.card-wrapper {
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: end;
}

.card__title {
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
  margin-bottom: 16px;
  align-self: start;
}

.card__price {
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
  margin-bottom: 8px;
}

.card__input {
  width: 65px;
  height: 35px;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #1A1F16;
  padding: 4px 6px;
  border: 1px solid #1A1F16;
  border-radius: 8px;
  margin-bottom: 8px;
}

.delete__button {
  background: none;
  border: none;
  position: absolute;
}
</style>