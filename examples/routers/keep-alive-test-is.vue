<template>
    <div>
        <!--
      按钮，用于切换组件
      注意,此时的A为字符串而非变量
        -->
        <button @click="showWhat === 'A' ? showWhat = 'B' : showWhat = 'A'">showA</button>
        <!--
        动态切换显隐，组件
        -->
        <keepAlive>
            <component :is="showWhat"></component>
        </keepAlive>
    </div>
</template>

<script>
    //引入组件A以及组件B
    import A from './keep-alive-test-1';
    import B from './keep-alive-test-2';
    export default {
        components: {
            //声明组件A,B
            A,
            B
        },
        data() {
            return {
                //默认显示组件A，若字符串为B则显示组件B,name为component声明
                showWhat: 'A'
            };
        }
    };
</script>

<style>
</style>