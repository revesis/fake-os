import {createStore} from "vuex";
import common from "./modules/common.js";
import user from "./modules/user.js";

const store = createStore({
    mutations: {
        revert(state) {
            const storeState = sessionStorage.getItem("storeState");
            if (storeState) {
                const storeStateObj = JSON.parse(storeState || "{}");
                Object.keys(state).forEach((key) => {
                    let stat = storeStateObj[key];
                    if (stat) {
                        state[key] = stat;
                    }
                });
                state.active = true;
            } else {
                state.active = false;
            }
        },
        persisted(state) {
            sessionStorage.setItem("storeState", JSON.stringify(state));
        }
    },
    modules: {
        common,
        user,
    },
    strict: true,
    devtools: false
});

export default store;
