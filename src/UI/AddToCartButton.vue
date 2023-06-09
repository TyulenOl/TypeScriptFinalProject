<template>
  <button class="add-to-cart"/>
</template>

<script>
export default {
  name: "AddToCartButton"
};
</script>

<style scoped>
.add-to-cart {
  cursor: pointer;
  background: #1A1F16 url("@/assets/images/bag-add.svg") no-repeat center;
  background-size: 15px;
  border: none;
  border-radius: 9px;
  width: 34px;
  height: 34px;
  transition: all .15s ease-in-out;
  z-index: 1;
}

.add-to-cart:hover {
  background-color: #40453d;
}

.add-to-cart:active {
  background-color: #12805D;
}

.add-to-cart_added {
  background: #02D693 url("@/assets/images/bag-added.svg") no-repeat center;
}

.add-to-cart_added:hover {
  background-color: #12805D;
}

.add-to-cart_added:active {
  background-color: #E5252C;
}
</style>