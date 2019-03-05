<template  functional>
    <!-- 这是个无状态组件 -->
    <div>
        <ul>
            <li v-for="item in props.list" v-bind:class="data.class" v-on="data.on">{{item}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'functional',
        props: {
            list: {
                type: Array
            }
        }
    };
</script>
<style lang="less">
.red {
    color: red;
    cursor: pointer;
}
</style>
