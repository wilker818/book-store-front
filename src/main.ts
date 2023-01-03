import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

import "@/assets/style/global.css";
import "@/assets/style/theme.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
//import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
