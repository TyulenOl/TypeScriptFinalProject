import {createApp} from 'vue';
import App from './App.vue';
import components from '@/UI';
import router from './router';
import {createPinia} from "pinia";

const app = createApp(App);
components.forEach(comp => {
  app.component(comp.name, comp);
});

app.use(createPinia()).use(router).mount('#app');
