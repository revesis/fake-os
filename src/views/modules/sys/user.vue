<style lang="css" src="../../../css/modules/sys/user.css"></style>

<template>
    <div class="user-container" id="user-container">
        <div class="form">
            <label for="search">
                <input type="text" id="search" @input="usernameChange" @keydown.enter="search"/>
            </label>
        </div>
        <table class="table" id="user-table">
            <caption>
                User manage panel
            </caption>
            <colgroup>
                <col/>
            </colgroup>
            <thead>
            <tr>
                <th scope="col">No</th>
                <th scope="col">Username</th>
                <th scope="col">Nickname</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Status</th>
                <th scope="col">Creator</th>
                <th scope="col" style="min-width: 160px;">Gmt create</th>
                <th scope="col" style="min-width: 160px;">Gmt modified</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
            <tfoot>
            </tfoot>
        </table>
        <div class="pagination" id="pagination">
            <a href="javascript:void(0)" class="first" style="display: none" @click="firstPage">
                <icon name="keyboard_double_arrow_left"></icon>
            </a>
            <a href="javascript:void(0)" class="previous" style="display: none" @click="previousPage">
                <icon name="keyboard_arrow_left"></icon>
                <span>Previous</span>
            </a>
            <div class="navigation">
            </div>
            <a href="javascript:void(0)" class="next" style="display: none" @click="nextPage">
                <icon name="keyboard_arrow_right"></icon>
                <span>Next</span>
            </a>
        </div>
    </div>
</template>

<script lang="js" src="../../../js/modules/sys/user.js"></script>
