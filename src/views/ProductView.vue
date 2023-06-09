<template>
  <div v-if="product">
    <dialog-modal :show="showDialog">
      <img class="dialog__image" :src="product.image" alt="">
      <div class="dialog__right-side">
        <h3 class="dialog__title">{{ product.title }}</h3>
        <span class="dialog__price">$ {{ product.price }} x {{ quantity }}</span>
        <input class="dialog__input" type="number" min="1" @input="() => {if (quantity < 1) quantity = 1 }"
               v-model="quantity">
        <button class="dialog__button" @click="changeCartState">Добавить в корзину</button>
      </div>
    </dialog-modal>
    <button class="back-button" @click="goBack">
      <img class="back-button__arrow" :src="require('@/assets/images/back_arrow.svg')" alt="">
      <span class="back-button__text">Назад</span>
    </button>
    <div class="wrapper">
      <img class="image" :src="product.image" alt="">
      <div class="right-part">
        <h1 class="title">{{ product.title }}</h1>
        <div class="product__statistics">
          <rating class="rating" :rate="product.rating.rate"/>
          <span class="rating__reviews">{{ product.rating.count }} отзывов</span>
        </div>
        <span class="price">$ {{ product.price }}</span>
        <p class="description">
          {{ product.description }}
        </p>
        <div class="buttons">
          <favorite-button :product="product" @click="changeFavoriteState" :class="{favorite_active: isFavorite}"/>
          <add-to-cart-button class="add-to-cart-btn" @click="showDialog = true"
                              :class="{'add-to-cart_added': addedToCart}" v-if="!addedToCart"/>
          <add-to-cart-button class="add-to-cart-btn" @click="changeCartState"
                              :class="{'add-to-cart_added': addedToCart}" v-else/>
        </div>
      </div>
    </div>
  </div>
  <loading v-else/>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import axios from "axios";
import {IProduct} from "@/interfaces/product";
import {useRoute, useRouter} from "vue-router";
import {useFavoritesStore} from "@/pinia/favorites";
import {useCartStore} from "@/pinia/cart";
import DialogModal from "@/components/DialogModal.vue";

export default defineComponent({
  name: "ProductPage",
  components: {
    DialogModal
  },
  setup() {
    async function getProduct(): Promise<void> {
      try {
        const response = await axios.get<IProduct>(`https://fakestoreapi.com/products/${route.params.id}`);
        if (response.status == 200) {
          product.value = response.data;
        }
      } catch (e) {
        console.error(e);
      }
    }

    function goBack(): void {
      router.back();
    }

    function changeFavoriteState() {
      if (product.value)
        if (isFavorite.value) {
          favoritesStore.deleteFavorite(product.value.id);
          isFavorite.value = !isFavorite.value;
        } else {
          favoritesStore.addFavorite(product.value.id);
          isFavorite.value = !isFavorite.value;
        }
      saveFavorite();
    }

    function saveFavorite() {
      const parsed = JSON.stringify(favoritesStore.getFavorites);
      localStorage.setItem('favoritesProducts', parsed);
    }

    function changeCartState() {
      if (product.value)
        if (addedToCart.value)
          cartStore.deleteFromCart(product.value.id);
        else
          cartStore.addToCart(product.value, quantity.value);

      addedToCart.value = !addedToCart.value;
      showDialog.value = false;
    }

    const showDialog = ref<boolean>(false);
    const quantity = ref<number>(1);
    const addedToCart = ref<boolean>(false);
    const cartStore = useCartStore();
    const isFavorite = ref<boolean>(false);
    const product = ref<IProduct | null>(null);
    const route = useRoute();
    const router = useRouter();
    const favoritesStore = useFavoritesStore();


    onMounted(async () => {
      await getProduct();

      if (localStorage.getItem('favoritesProducts')) {
        const storedFavoritesProducts = localStorage.getItem('favoritesProducts');
        if (typeof storedFavoritesProducts === 'string')
          favoritesStore.favorites = JSON.parse(storedFavoritesProducts);
      }

      isFavorite.value = favoritesStore.getFavorites.some(id => product.value && id == product.value.id);
      addedToCart.value = cartStore.getProducts.some(prod => product.value && prod.id == product.value.id);
    });

    return {
      product,
      goBack,
      isFavorite,
      changeFavoriteState,
      changeCartState,
      quantity,
      showDialog,
      addedToCart
    };
  }
});
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}

.back-button {
  background: inherit;
  border: none;
  cursor: pointer;
}

.back-button__text {
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
}

.back-button__arrow {
  margin-right: 12px;
  transition: all .3s ease-in-out;
}

.back-button:hover .back-button__arrow {
  transform: translateX(-5px);
}

.right-part {
  display: flex;
  flex-direction: column;
  max-width: 30%;
  margin-left: 32px;
}

.image {
  width: 324px;
  background: #FFFFFF;
  border-radius: 13px;
  padding: 32px;
  object-fit: contain;
}

.title {
  font-weight: 700;
  font-size: 54px;
  line-height: 54px;
  color: #1A1F16;
  margin-bottom: 24px;
}

.rating__reviews {
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
}

.product__statistics {
  margin-bottom: 16px;
}

.price {
  font-weight: 500;
  font-size: 31px;
  line-height: 38px;
  color: #1A1F16;
}

.description {
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
  margin-bottom: 16px;
}

.add-to-cart-btn {
  align-self: end;
  width: 44px;
  height: 44px;
  background-size: 24px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
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