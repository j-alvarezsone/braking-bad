import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';

import './assets/main.css';
import '@/store/characters';

const app = createApp(App);

VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnReconnect: 'always',
      },
    },
  },
});

app.use(router);
app.mount('#app');
