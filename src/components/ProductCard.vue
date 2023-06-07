<template>
  <div class="product">
    <div class="product__top-part">
      <img class="product__image" :src="product.image" alt="">
      <h3 class="product__title">{{ product.title }}</h3>
    </div>
    <div class="product__bottom-part">
      <div class="product__statistics">
        <div class="rating">
          <meter class="rating__stars" min="0" max="5" :value="product.rating.rate"
                 :title="`Рейтинг ${product.rating.rate}`"/>
          <span class="rating__text">{{ product.rating.rate }}/5</span>
        </div>
        <span class="rating__reviews">{{ product.rating.count }} отзывов</span>
      </div>
      <div class="product__price-and-cart">
        <p class="product__price">{{ product.price }}$</p>
        <button class="product__add-to-cart"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {IProduct} from "@/interfaces/product";

export default defineComponent({
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
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
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
  font-style: normal;
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
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
}

.product__add-to-cart {
  cursor: pointer;
  background: #1A1F16 url("@/assets/images/bag-add.svg") no-repeat center;
  background-size: 15px;
  border: none;
  border-radius: 9px;
  width: 34px;
  height: 34px;
  transition: all .15s ease-in-out;
}

.product__add-to-cart:hover {
  background-color: #40453d;
}

.product__add-to-cart:active {
  background-color: #12805D;
}

.product__add-to-cart_added {
  background: #02D693 url("@/assets/images/bag-added.svg") no-repeat center;
}

.product__add-to-cart_added:hover {
  background-color: #12805D;
}

.product__add-to-cart_added:active {
  background-color: #E5252C;
}

.product__statistics {
  margin-bottom: 8px;
}

.rating {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.rating__stars {
  position: relative;
  appearance: none;
  color: transparent;
  width: auto;
  display: block;
  vertical-align: center;
  margin-right: 24px;
  margin-bottom: 8px;
}

.rating__stars::before {
  font-size: 24px;
  --percent: calc(v-bind('product.rating.rate') / 5 * 100%);
  content: '★★★★★';
  position: relative;
  top: 0;
  left: 0;
  color: rgba(0, 0, 0, 0.2);
  background: linear-gradient(90deg, #12805D var(--percent), rgba(0, 0, 0, 0.2) var(--percent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.rating__text {
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #12805D;
}

.product__price-and-cart {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>