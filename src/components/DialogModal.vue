<template>
  <div class="dialog" @click="$emit('hideDialog')" v-if="show">
    <div class="dialog__content" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "DialogModal",
  props: {
    show: {type: Boolean, required: true},
  }
});
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.dialog__content {
  display: flex;
  background: #FFFFFF;
  padding: 16px 24px;
  max-width: 600px;
  border-radius: 21px;
}
</style>