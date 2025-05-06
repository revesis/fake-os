// noinspection DuplicatedCode

import {defineComponent} from "vue";

// global variable
let dataModel = {
    username: "",
    password: ""
};


function login(username, password) {
    const param = new FormData();
    param.append("username", username);
    param.append("password", password);
    return new Promise((resolve, reject) => {
        this.$http({
            url: "/login",
            method: "post",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: param,
        }).then((data) => {
            if (data.success) {
                resolve(data.body);
            } else {
                reject(data);
            }
        });
    });
}

function queryUser() {
    return new Promise((resolve, reject) => {
        this.$http({
            url: "/sys/user/queryuser",
            method: "get"
        }).then((data) => {
            if (data && data.success) {
                resolve(data.body);
            } else {
                reject(data);
            }
        });
    });
}

function queryNav() {
    return new Promise((resolve, reject) => {
        this.$http({
            url: "/sys/menu/querynav",
            method: "get",
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
}


// export
export default defineComponent({
    name: "login",
    data() {
        return {
            dataModel
        };
    },
    beforeCreate() {
        const reg = new RegExp('(?:^|;\\s*)JSESSIONID=[^;]*');
        if (reg.test(document.cookie)) {
            queryUser.bind(this)().then(data => {
                let userId = data["id"];
                let username = data["username"];
                let nickname = data["nickname"];
                this.$store.commit("user/updateId", userId);
                this.$store.commit("user/updateUsername", username);
                this.$store.commit("user/updateNickname", nickname);

                this.$store.commit("persisted");
                return queryNav.bind(this)().then(data => {
                    sessionStorage.setItem("menuList", JSON.stringify(data.menuList || "[]"));

                    // location.reload();
                    this.$router.replace({name: "main"});
                });
            }).catch((e) => {
                sessionStorage.removeItem("menuList");
                console.log(
                    `%c${e} Failed to request menu list and permissions, redirected to login page!!`,
                    "color:blue"
                );
                this.$router.replace({name: "401"});
            });
        }
    },
    created() {
        initData.bind(this)();
    },
    methods: {
        dataFormSubmit(event) {
            event.preventDefault();
            event.stopPropagation();

            // const target = event.target;

            let {username, password} = this.dataModel;
            login.bind(this)(username, password).then((data) => {
                // this.dataModel.username = '';
                this.dataModel.password = '';
                // document.getElementById('loginForm').reset();
                // 1 day = 24 hour = 1440 minute = 86,400 second
                // 30 day = 30 × 86,400 = 2,592,000 second
                document.cookie = "JSESSIONID=" + data + "; max-age=2592000; path=/; SameSite=Lax";
            }).then(() => {
                return queryUser.bind(this)().then(data => {
                    let userId = data["id"];
                    let username = data["username"];
                    let nickname = data["nickname"];
                    this.$store.commit("user/updateId", userId);
                    this.$store.commit("user/updateUsername", username);
                    this.$store.commit("user/updateNickname", nickname);

                    this.$store.commit("persisted");
                });
            }).then(() => {
                return queryNav.bind(this)().then(data => {
                    sessionStorage.setItem("menuList", JSON.stringify(data.menuList || "[]"));

                    this.$router.replace({name: "main"});
                }).catch((e) => {
                    sessionStorage.removeItem("menuList");
                    console.log(
                        `%c${e} Failed to request menu list and permissions, redirected to login page!!`,
                        "color:blue"
                    );
                    this.$router.replace({name: "401"});
                });
            }).catch((err) => {
                window.alert(err.body);
            });
        }
    }
});
