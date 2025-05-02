import {createRouter, createWebHistory} from "vue-router";

/**
 * Lazy loading is not used in the development environment,
 * because too many lazy loading pages will cause webpack hot update to be too slow,
 * so lazy loading is only used in the production environment
 */
const modules = import.meta.glob("/src/views/**/*.vue");
const _import = (path) => modules["/src/views/" + path + ".vue"];

const globalRoutes = [
    {
        path: "/401",
        component: _import("common/401"),
        name: "401",
        meta: {title: "401"},
    },
    {
        path: "/404",
        component: _import("common/404"),
        name: "404",
        meta: {title: "404 Not Found"},
    },
    {
        path: "/login",
        component: _import("common/login"),
        name: "login",
        meta: {title: "Login"},
    },
    {
        path: "/redirect/:path(.*)",
        component: _import("common/redirect")
    },
    {path: "/:catchAll(.*)", component: _import("common/404")},
];

const mainRoutes = {
    path: "/",
    component: _import("main"),
    name: "main",
    redirect: {name: "home"},
    meta: {title: "Main"},
    children: [
        {
            path: "/home",
            component: _import("common/home"),
            name: "home",
            meta: {title: "Home"},
        }
    ]
};

// noinspection JSUnusedLocalSymbols
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        // noinspection JSUnusedLocalSymbols
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (to.hash) {
                    resolve({
                        el: to.hash,
                        behavior: "smooth",
                    });
                }
            }, 250);
        });
    },
    routes: globalRoutes.concat(mainRoutes),
});

let  isAddDynamicMenuRoutes = false;
router.beforeEach((to, from, next) => {
    if (isAddDynamicMenuRoutes && fnCurrentRouteContains(to, router.getRoutes())) {
        next();
    } else {
        let menuList = JSON.parse(sessionStorage.getItem("menuList"));
        if (!menuList) {
            next();
            return;
        }
        isAddDynamicMenuRoutes = true;
        fnAddDynamicMenuRoutes(menuList);
        if (fnCurrentRouteContains(to, router.getRoutes())) {
            next({...to, replace: true});
        } else {
            router.push({name: "404"}).then(() => {});
        }
    }
});

function fnCurrentRouteContains(route, routes = []) {
    let temp = [];
    for (let i = -1; ++i < routes.length;) {
        if (route.path === routes[i].path) {
            return true;
        } else if (routes[i].children && routes[i].children.length >= 1) {
            temp = temp.concat(routes[i].children);
        }
    }
    return temp.length >= 1 ? fnCurrentRouteContains(route, temp) : false;
}

function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
    let temp = [];
    for (let i = -1; ++i < menuList.length;) {
        if (menuList[i].list && menuList[i].list.length >= 1) {
            temp = temp.concat(menuList[i].list);
        } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
            menuList[i].url = menuList[i].url.replace(/^\//, "");
            let route = {
                path: menuList[i].url.replace("/", "-"),
                component: null,
                name: menuList[i].url.replace("/", "-"),
                meta: {
                    menuId: menuList[i].menuId,
                    title: menuList[i].name,
                    isDynamic: true,
                    isTab: true,
                },
            };
            if (/^http[s]?:\/\/.*/.test(menuList[i].url)) {
                route["path"] = `i-${menuList[i].menuId}`;
                route["name"] = `i-${menuList[i].menuId}`;
                route["meta"]["iframeUrl"] = menuList[i].url;
                route["component"] = _import(`common/LinkHome`) || null;
            } else {
                try {
                    route["component"] = _import(`modules/${menuList[i].url}`) || null;
                } catch (ex) {
                    console.error(ex);
                }
            }
            routes.push(route);
        }
    }
    if (temp.length >= 1) {
        fnAddDynamicMenuRoutes(temp, routes);
    } else {
        mainRoutes.name = "sys-dynamic";
        mainRoutes.children = routes;
        router.addRoute(mainRoutes);
        router.addRoute({path: "/:pathMatch(.*)*", redirect: {name: "404"}});
        sessionStorage.setItem(
            "dynamicMenuRoutes",
            JSON.stringify(mainRoutes.children || "[]")
        );
        console.log("\n");
        console.log(
            "%c!<-------------------- Dynamic (menu) routing starts -------------------->",
            "color:blue"
        );
        console.log(mainRoutes.children);
        console.log(
            "%c!<-------------------- Dynamic (menu) routing ends -------------------->",
            "color:blue"
        );
    }
}

export default router;
