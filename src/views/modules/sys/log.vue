<style lang="css" src="../../../css/modules/sys/log.css"></style>

<template>
    <div class="log-container" id="log-container">
        <div class="form">
            <label for="search">
                <input type="text" id="search" @input="usernameChange" @keydown.enter="search"/>
            </label>
        </div>
        <table class="table" id="log-table">
            <caption>
                Log manage panel
            </caption>
            <colgroup>
                <col/>
            </colgroup>
            <thead>
            <tr>
                <th scope="col">No</th>
                <th scope="col">Log name</th>
                <th scope="col">Log type</th>
                <th scope="col">Event type</th>
                <th scope="col">Username</th>
                <th scope="col">Service</th>
                <th scope="col">Detail</th>
                <th scope="col">Ip</th>
                <th scope="col" style="min-width: 300px;">Device info</th>
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
<!--                <span class="page cursor">-->
<!--                    1-->
<!--                </span>-->
<!--                <a href="javascript:void(0)" class="page">-->
<!--                    2-->
<!--                </a>-->
            </div>
            <a href="javascript:void(0)" class="next" style="display: none" @click="nextPage">
                <icon name="keyboard_arrow_right"></icon>
                <span>Next</span>
            </a>
        </div>
    </div>
</template>

<script lang="js" src="../../../js/modules/sys/log.js"></script>
