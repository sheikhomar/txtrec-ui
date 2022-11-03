import { createApp } from "vue";
import { createPinia } from "pinia";
import withUUID from "vue-uuid";
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = withUUID(createApp(App));

// Register a global custom directive called `v-focus`
app.directive("focus", {
  mounted(el) {
    el.focus();
  }
});

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'

app.mount("#app");
