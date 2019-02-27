<template>
    <div class="hello">
        <h1>{{msg}}</h1>
        <p @click="handleClick">点我跳转到test-1</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: '13'
            };
        },
        methods: {
            handleClick() {
                this.$router.replace('/keep-alive-test-1');
            }
        },
        beforeRouteEnter(to, from, next) {
            next();
        },
        beforeRouteLeave(to, from, next) {
            // 设置下一个路由的 meta

            // to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
            next();
        },
        mounted() {
            console.log('keep-alive-test-2 ---- mounted');
        }
    };
</script>