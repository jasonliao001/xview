<template>
    <div>
        {{width}}
        <render-cell :render="renderFunc"></render-cell>
    </div>
</template>
<script>
    import RenderCell from './render.js';
    export default {
        props: {
            render: {
                type: Function
            },
            width: {
                type: String
            }
        },
        components: {
            RenderCell
        },
        data() {
            return {};
        },
        computed: {
            renderFunc() {
                return this.render || function() {};
            }
        }
    };
</script>
<style lang="less" scoped>
</style>
