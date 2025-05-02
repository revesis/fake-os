import {defineComponent} from "vue";

export default defineComponent({
    beforeCreate() {
        // clear login information
        const reg = new RegExp('(?:^|;\\s*)JSESSIONID=[^;]*');
        if (reg.test(document.cookie)) {
            document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";
        }
        sessionStorage.clear();
        localStorage.clear();
        // sessionStorage.removeItem("storeState");
        // sessionStorage.removeItem("menuList");
        // sessionStorage.removeItem("dynamicMenuRoutes");
    },
    created() {
        this.$nextTick(() => {
            // code that only runs after the entire view has been rendered
            this.$router["replace"]({name: "login"});
        }).then(() => {});
    }
});
