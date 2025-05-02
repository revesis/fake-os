<!--suppress HtmlDeprecatedAttribute -->
<style lang="css" src="../css/main.css"></style>

<template>
    <div class="main-container" id="main-container">
        <!-- sidebar section starts -->
        <aside class="sidebar" id="sidebar">
            <label for="themeSwitch" class="themeSwitch">
                <svg class="sun" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                     width="24px" fill="#5f6368">
                    <path
                        d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/>
                </svg>
                <svg class="moon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                     width="24px" fill="#5f6368">
                    <path
                        d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
                </svg>
                <input type="checkbox" style="display: none" id="themeSwitch">
            </label>
            <div class="logo"> {{ appName }} </div>
            <nav class="navbar" id="navbar">
                <div class="item" @click="gotoHome">
                    <icon name="dashboard" class="sidebar__menu-icon"></icon>
                    <span>Dashboard</span>
                </div>
                <div class="item" @click="gotoRouteHandle(menu)" v-for="menu in menuList">
                    <icon :name="menu['icon'] || ''" class="sidebar__menu-icon"></icon>
                    <span>{{ menu['name'] }}</span>
                </div>
            </nav>

            <!-- footer section starts -->
            <footer class="footer">
                <div></div>
                <div class="credit">
                    created by <span>ms. revesis</span> | all rights reserved | {{ version }}
                </div>
            </footer>
            <!-- footer section ends -->
        </aside>
        <!-- sidebar section ends -->

        <label for="sideMenu" class="sideMenu">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                 fill="#5f6368">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
            <input type="checkbox" style="display: none" id="sideMenu">
        </label>

        <div class="wrapper">
            <!-- header section starts -->
            <header class="header">
                <div class="navbar__body clearfix">
                    <div class="navbar__menu navbar__menu--right">
                        <div class="navbar__avatar">
                            <div class="dropdown">
                                <div class="dropdown-link">
                                    <img src="../assets/images/avatar.jpg" :alt="nickname"/>{{ nickname }}
                                </div>
                                <div class="dropdown-menu">
                                    <div class="dropdown-item" @click="updatePasswordHandle">Change Password</div>
                                    <div class="dropdown-item" @click="logoutHandle">Logout</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <dialog class="updatePasswordDialog" id="updatePasswordDialog" v-on:close="dataFormSubmit">
                    <p class="dialog__header">Change Password</p>
                    <form method="dialog" class="dialog__form" id="updatePasswordForm">
                        <div class="form__list">
                            <p class="form__item">
                                <input type="password" v-model="dataForm.password" placeholder="Old password">
                            </p>
                            <p class="form__item">
                                <input type="password" v-model="dataForm.newPassword" placeholder="New password">
                            </p>
                            <p class="form__item">
                                <input type="password" v-model="dataForm.confirmPassword" placeholder="Confirm new password">
                            </p>
                        </div>
                        <div class="dialog-footer">
                            <button value="cancel">Cancel</button>
                            <button id="confirmBtn" value="default">Confirm</button>
                        </div>
                    </form>
                </dialog>
            </header>
            <!-- header section ends -->

            <!-- content section starts -->
            <section class="content" :style="contentViewHeight">
                <div class="content__wrapper">
                    <main>
                        <!--suppress HtmlWrongAttributeValue -->
                        <iframe v-if="/^https?:\/\/.*/.test(this['$route'].meta.iframeUrl)"
                                width="100%" height="100%"
                                :src="this['$route'].meta.iframeUrl"
                                frameborder="0" allowtransparency="true" allowfullscreen="true">
                        </iframe>
                        <router-view v-slot="{ Component }"
                                     v-else>
                            <!-- <transition> -->
                            <keep-alive>
                                <component :is="Component"/>
                            </keep-alive>
                            <!-- </transition> -->
                        </router-view>
                    </main>
                </div>
            </section>
            <!-- content section ends -->
        </div>
    </div>
</template>

<script lang="js" src="../js/main.js"></script>
