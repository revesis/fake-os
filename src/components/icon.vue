<template>
    <span class="material-symbols-outlined">
        {{ name }}
    </span>
</template>

<script>
export default {
    name: "icon",
    props: {
        name: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="css" scoped>
.material-symbols-outlined {
    width: 1.5rem;
    height: 1.5rem;
    align-self: center;
    fill: currentColor;
    overflow: hidden;
}
</style>
