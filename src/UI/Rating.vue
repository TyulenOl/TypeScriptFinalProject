<template>
  <div class="rating">
    <meter class="rating__stars" min="0" max="5" :value="rate"
           :title="`Рейтинг ${rate}`"/>
    <span class="rating__text">{{ rate }}/5</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Rating",
  props: {
    rate: {type: Number, required: true}
  }
});
</script>

<style scoped>
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
  font-size: 26px;
  --percent: calc(v-bind('rate') / 5 * 100%);
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
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #12805D;
}
</style>