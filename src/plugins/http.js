import axios from "axios";
import router from "/src/plugins/router";
import logger from "./logger.js";


// import.meta.env.VITE_BASE_URL
const http = axios.create({
    baseURL: '/api',
    // baseURL: 'http://127.0.0.1:8080/',
    // baseURL: 'http://edit.gelad.com:8080/',
    timeout: 1000 * 10,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    }
});

/**
 * request interceptor
 */
http.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * response interceptor
 */
http.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res && res["message"] === "401") {
           router.push({name: "401"}).then(() => {
           });
        }
        return res;
    },
    (error) => {
        const config = error.config;
        logger.info(config.url, error.message);
        return Promise.reject(error);
    }
);

const _http = {};
Object.assign(_http, http);
_http.install = (app) => {
    app.config.globalProperties.$http = http;
};

export default _http;
