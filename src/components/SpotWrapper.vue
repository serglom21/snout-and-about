<template>
    <div class="spot">
        {{ spotName }} ({{ sniffCount }} sniffs)
    </div>
</template>


<script>
    export default {
        name: "SpotWrapper",
        props: {
            spotName: String,
            sniffCount: Number
        }
    }
</script>

<style scoped>
 .spot {
    padding: 5px;
    border-bottom: 1px solid #ddd;
    display: block;
    margin-bottom: 30px;
  }
</style>