<style lang="css" src="../../css/common/404.css" scoped></style>

<template>
    <div class="container">
        <p><b>404.</b> <ins>That’s an error.</ins></p>
        <p>The requested URL <code>{{this["$route"].path}}</code> was not found on this server.  <ins>That’s all we know.</ins></p>
        <button @click="this['$router'].go(-1)">Back</button>
    </div>
</template>
