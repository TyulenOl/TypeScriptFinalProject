<template>
  <div class="container">
    <router-view/>
  </div>
</template>

<style>
html {
  box-sizing: border-box;
  line-height: 1;
  background: #EDEDED;
}

*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
}

@font-face {
  font-family: "Muller";
  src: local("Muller-Regular"),
  url("@/assets/fonts/MullerRegular.woff2") format("woff2"),
  url("@/assets/fonts/MullerRegular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Muller";
  src: local("Muller-Bold"),
  url("@/assets/fonts/MullerBold.woff2") format("woff2"),
  url("@/assets/fonts/MullerBold.woff") format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Muller";
  src: local("Muller-Medium"),
  url("@/assets/fonts/MullerMedium.woff2") format("woff2"),
  url("@/assets/fonts/MullerMedium.woff") format("woff");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

#app {
  font-family: 'Muller', Helvetica, Arial, sans-serif;
  accent-color: #12805D;
}

.container {
  margin: 0 auto;
  padding: 40px 32px 32px;
}
</style>
