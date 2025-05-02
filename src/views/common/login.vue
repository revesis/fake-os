<style lang="css" src="../../css/common/login.css" scoped></style>

<template>
    <div class="container">
        <!-- login section starts -->
        <section class="login">
            <form id="loginForm" v-on:submit="dataFormSubmit">
                <div class="title">
                    <div class="logo" style="display: none">logo</div>
                    <div class="box">
                        <h1>Sign in</h1>
                        <p>Use your ID</p>
                    </div>
                </div>
                <div class="payload">
                    <div class="content">
                        <div class="item">
                            <input type="text" placeholder="username" v-model="dataModel.username" />
                        </div>
                        <div class="item">
                            <input type="password" placeholder="password" v-model="dataModel.password" />
                        </div>
                    </div>
                </div>
                <div class="button">
                    <button type="submit" class="btn"> login </button>
                </div>
            </form>
        </section>
        <!-- login section ends -->

        <!-- footer section starts -->
        <section class="footer">
            <div></div>
            <div class="credit">
                created by <span>ms. revesis</span> | all rights reserved
            </div>
        </section>
        <!-- footer section ends -->
    </div>
</template>

<script lang="js" src="../../js/common/login.js"></script>
