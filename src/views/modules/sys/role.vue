<style lang="css" src="../../../css/modules/sys/role.css"></style>

<template>
  <div class="role-container" id="role-container">
      <div class="form">
            <label for="search">
                <input type="text" id="search" @input="roleNameChange" @keydown.enter="search"/>
            </label>
        </div>
        <table class="table" id="role-table">
            <caption>
                Role manage panel
            </caption>
            <colgroup>
                <col/>
            </colgroup>
            <thead>
            <tr>
                <th scope="col">No</th>
                <th scope="col">RoleName</th>
                <th scope="col">Remark</th>
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

<script lang="js" src="../../../js/modules/sys/role.js"></script>
