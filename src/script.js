import App from "./App.vue";
import {createApp} from "vue";
import router from "./plugins/router.js";
import store from "./plugins/store.js";
import http from "./plugins/http.js";
import logger from "./plugins/logger.js";

import Icon from "./components/icon.vue";


function init() {
    const app = createApp(App);
    app.use(router);
    app.use(store);
    app.use(http);
    app.use(logger);

    app.component("Icon", Icon);

    app.mount("#entry");
}

init();
