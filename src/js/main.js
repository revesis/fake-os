import {defineComponent} from "vue";

let dataForm = {
    password: "",
    newPassword: "",
    confirmPassword: "",
};
let menuList = [];
let menuRouteMap = new Map();

function logout() {
    return new Promise((resolve, reject) => {
        this.$http({
            url: "/logout",
            method: "post"
        }).then((data) => {
            if (data && data.success) {
                resolve(data.body);
            } else {
                reject(data);
            }
        });
    });
}

function changePassword(password, newPassword) {
    const param = {password, newPassword};
    return new Promise((resolve, reject) => {
        this.$http({
            url: "/sys/user/password",
            method: "post",
            data: param
        }).then((data) => {
            if (data && data.success) {
                resolve(data.body);
            } else {
                reject(data);
            }
        });
    });
}

// init data
function initData() {
    let user = this.$store.state.user;
    this.userId = user.userId;
    this.username = user.username;
    this.nickname = user.nickname;

    this.menuList = JSON.parse(sessionStorage.getItem("menuList") || "[]");
    let menuRoutes = JSON.parse(sessionStorage.getItem("dynamicMenuRoutes") || "[]");
    let self = this;
    for (let route of menuRoutes) {
        let menuId = route.meta.menuId;
        self.menuRouteMap.set(menuId, route);
    }
}

function initPanel() {
}

// export
export default defineComponent( {
    name: "main-page",
    data() {
        return {
            dataForm,
            menuList,
            menuRouteMap,
            appName: "",
            version: ""
        };
    },
    computed: {
        documentClientHeight: {
            get() {
                return this.$store.state.common.documentClientHeight;
            },
            set(val) {
                this.$store.commit("common/updateDocumentClientHeight", val);
            }
        },
        userId: {
            get() {
                return this.$store.state.user.id;
            },
            set(val) {
                this.$store.commit("user/updateId", val);
            }
        },
        username: {
            get() {
                return this.$store.state.user.username;
            },
            set(val) {
                this.$store.commit("user/updateUsername", val);
            }
        },
        nickname: {
            get() {
                return this.$store.state.user.nickname;
            },
            set(val) {
                this.$store.commit("user/updateNickname", val);
            }
        },
        contentViewHeight() {
            let height = this.documentClientHeight - 64;
            return {height: height + "px"};
        }
    },
    beforeCreate() {
        const reg = new RegExp('(?:^|;\\s*)JSESSIONID=[^;]*');
        if (!reg.test(document.cookie)) {
            this.$router.replace({name: "401"});
            return;
        }
        if (sessionStorage.getItem("dynamicMenuRoutes")) {
            this.$store.commit("revert");
        }
    },
    created() {
        this.appName = document.title;
        this.version = import.meta.env.VITE_APP_VERSION;
        // resetDocumentClientHeight
        this.documentClientHeight = document.documentElement["clientHeight"];
        window.onresize = () => {
            this.documentClientHeight = document.documentElement["clientHeight"];
        };
        if (!this.$store.state.active) {
            this.$router.replace({name: "login"});
        } else {
            initData.bind(this)();
        }
    },
    mounted() {
        initPanel.bind(this)();
    },
    methods: {
        updatePasswordHandle() {
            const updatePasswordDialog = document.getElementById('updatePasswordDialog');
            if (typeof updatePasswordDialog.showModal === "function") {
                updatePasswordDialog.showModal();
            } else {
                window.alert("Sorry, the <dialog> API is not supported by this browser.");
            }
            this.$nextTick(() => {
                this.dataForm.password = '';
                this.dataForm.newPassword = '';
                this.dataForm.confirmPassword = '';
                const updatePasswordForm = document.getElementById('updatePasswordForm');
                updatePasswordForm.reset();
            }).then(() => {
            });
        },
        logoutHandle() {
            if (window.confirm("Are you sure to proceed with the [Logout] operation?")) {
                logout.bind(this)().then(() => {
                    this.$router.push({name: "401"});
                }).catch((err) => {
                    window.alert(err.body);
                });
            }
        },
        dataFormSubmit(event) {
            const target = event.target;
            if ('default' === target.returnValue || true === target.returnValue) {
                let {password, newPassword} = this.dataForm;
                changePassword.bind(this)(password, newPassword).then(() => {
                    this.$router.replace({name: "401"});
                }).catch((err) => {
                    window.alert(err.message);
                });
            } else if ('cancel' === target.returnValue) {
            }
        },
        gotoHome() {
            this.$router.push({ name: 'home' });
        },
        gotoRouteHandle(menu) {
            let menuId = menu.menuId;
            let route = this.menuRouteMap.get(menuId);
            if (route) {
                this.$router.push({name: route.name});
            } else {
                if (!sessionStorage.getItem("dynamicMenuRoutes")) {

                } else {
                    window.alert(menu.name + " not found !");
                }
            }
        },
    }
});
