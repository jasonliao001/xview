<template>
    <div class="hello">
        <h1>{{msg}}</h1>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: ''
            };
        },
        mounted() {
            console.log('keep-alive-test-2 ---- mounted');
        }
    };
</script>