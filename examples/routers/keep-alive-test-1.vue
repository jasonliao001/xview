<template>
    <div class="hello">
        <h1>Vue</h1>
        <h2>{{msg}}</h2>
        <input placeholder="输入框" v-model="msg"></input>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                msg:""
            };
        },
        mounted() {
            console.log('keep-alive-test-1 ---- mounted');
        }
    };
</script>