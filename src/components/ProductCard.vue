<template>
  <dialog-modal :show="showDialog" @hideDialog="showDialog = false">
    <img class="dialog__image" :src="product.image" alt="">
    <div class="dialog__right-side">
      <h3 class="dialog__title">{{ product.title }}</h3>
      <span class="dialog__price">$ {{ product.price }} x {{ quantity }}</span>
      <input class="dialog__input" type="number" min="1" @input="() => {if (quantity < 1) quantity = 1 }"
             v-model="quantity">
      <button class="dialog__button" @click="changeCartState">Добавить в корзину</button>
    </div>
  </dialog-modal>
  <div class="product">
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
        <favorite-button :product="product" @click="changeFavoriteState" :class="{'favorite_active': isFavorite}"/>
        <add-to-cart-button @click="showDialog = true" :class="{'add-to-cart_added': addedToCart}" v-if="!addedToCart"/>
        <add-to-cart-button @click="changeCartState" :class="{'add-to-cart_added': addedToCart}" v-else/>
      </div>
    </div>
    <router-link class="product__link" :to="`/product/${product.id}`"/>
  </div>
</template>

<script lang="ts">

import {defineComponent, onMounted, PropType, ref, watch} from "vue";
import {IProduct} from "@/interfaces/product";
import {useFavoritesStore} from "@/pinia/favorites";
import {useCartStore} from "@/pinia/cart";
import DialogModal from "@/components/DialogModal.vue";

export default defineComponent({
  name: "ProductCard",
  components: {
    DialogModal
  },
  props: {
    product: {required: true, type: Object as PropType<IProduct>},
  },
  setup(props) {
    function changeFavoriteState() {
      if (isFavorite.value)
        favoritesStore.deleteFavorite(props.product.id);
      else
        favoritesStore.addFavorite(props.product.id);

      isFavorite.value = !isFavorite.value;
      saveFavorite();
    }

    function saveFavorite() {
      const parsed = JSON.stringify(favoritesStore.getFavorites);
      localStorage.setItem('favoritesProducts', parsed);
    }

    function changeCartState() {
      if (addedToCart.value)
        cartStore.deleteFromCart(props.product.id);
      else
        cartStore.addToCart(props.product, quantity.value);

      addedToCart.value = !addedToCart.value;
      showDialog.value = false;
    }

    const showDialog = ref<boolean>(false);
    const quantity = ref<number>(1);
    const isFavorite = ref<boolean>(false);
    const addedToCart = ref<boolean>(false);
    const favoritesStore = useFavoritesStore();
    const cartStore = useCartStore();

    onMounted(() => {
      isFavorite.value = favoritesStore.getFavorites.some(id => id == props.product.id);
      addedToCart.value = cartStore.getProducts.some(prod => props.product && prod.id == props.product.id);
    });

    watch(cartStore, () => {
      addedToCart.value = cartStore.getProducts.some(prod => props.product && prod.id == props.product.id);
    });

    return {
      changeFavoriteState,
      changeCartState,
      isFavorite,
      addedToCart,
      cartStore,
      showDialog,
      quantity
    };
  }
});
</script>

<style scoped>
.product {
  position: relative;
  width: 280px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
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

.product__link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dialog__image {
  height: 180px;
  padding: 8px;
  margin-right: 16px;
  background: #ffffff;
  border-radius: 22px;
  object-fit: contain;
}

.dialog__right-side {
  display: flex;
  flex-direction: column;
}

.dialog__title {
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
  margin-bottom: 16px;
}

.dialog__price {
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
  margin-bottom: 8px;
}

.dialog__input {
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

.dialog__button {
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #FFFFFF;
  background: #1A1F16;
  border: none;
  border-radius: 8px;
  height: 2em;
  width: 200px;
  padding: 4px 6px;
  transition: all .15s ease-in-out;
}

.dialog__button:hover {
  background: #40453d;
}

.dialog__button:active {
  background: #FFFFFF;
  color: #1A1F16;
  border: 2px solid #1A1F16;
}
</style>