<template>
  <div class="form">
    <input type="text" class="form__input" id="name" :value="text" @input="updateInputValue" placeholder="Найти товар"/>
    <label for="name" class="form__label">Найти товар</label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SearchInput",
  props: {
    text: {type: String, required: true}
  },
  setup(props, context) {
    function updateInputValue(event: { target: { value: string } }): void {
      context.emit('update:text', event.target.value);
    }

    return {
      updateInputValue
    };
  }
});
</script>

<style scoped>
.form {
  position: relative;
  margin: 16px auto;
  max-width: 500px;
  min-width: 250px;
}

.form__input {
  width: 100%;
  color: #1A1F16;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  padding: 16px 24px;
  background: #FFFFFF;
  box-shadow: 0 4px 16px rgba(26, 31, 22, 0.15);
  border: 1px solid #FFFFFF;
  border-radius: 13px;
  transition: all .3s;
}

.form__input:focus {
  outline: none;
  border-color: #02D693;
  box-shadow: 0 0 0 2px rgba(18, 128, 93, 0.3);
}

.form__label {
  display: block;
  position: absolute;
  bottom: 50%;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #60695C;
  left: 24px;
  transition: all .3s;
  transform: translate3d(0, 50%, 0);
  transform-origin: 0 0;
  opacity: 0;
}

.form__input:placeholder-shown + .form__label {
  visibility: hidden;
  z-index: -1;
}

.form__input:not(:placeholder-shown) + .form__label,
.form__input:focus:not(:placeholder-shown) + .form__label {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: #60695C;
  visibility: visible;
  z-index: 1;
  opacity: 1;
  transform: translateY(-2rem);
}
</style>