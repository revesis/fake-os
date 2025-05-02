<script lang="js">
export default {
    created() {
        const {params, query} = this.$route;
        this.$router.replace({path: "/" + params.path, query});
    }
}
</script>
