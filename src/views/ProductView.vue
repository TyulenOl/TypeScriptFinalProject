<template>
  <div v-if="product">
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
          <favorite-button :product="product" @click="changeFavoriteState" :class="{favorite_active: favorite}"/>
          <add-to-cart-button class="add-to-cart-btn"/>
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
import {useFavoritesStore} from "@/pinia";

export default defineComponent({
  name: "ProductPage",
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
        if (favorite.value) {
          favoritesStore.deleteFavoriteProduct(product.value.id);
          favorite.value = !favorite.value;
        } else {
          favoritesStore.addFavoriteProduct(product.value.id);
          favorite.value = !favorite.value;
        }
      saveFavorite();
    }

    function saveFavorite() {
      const parsed = JSON.stringify(favoritesStore.getFavoritesProducts);
      localStorage.setItem('favoritesProducts', parsed);
    }

    const favorite = ref<boolean>(false);
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

      favorite.value = favoritesStore.getFavoritesProducts.some(id => product.value && id == product.value.id);
    });

    return {
      product,
      goBack,
      favorite,
      changeFavoriteState
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
</style>