<template>
    <ul>
        <li>
            <span :class="arrowClasses" @click.stop="handleExapnd">
                <i :class="[prefixCls + '-arrow-right']" v-show="showArrow"></i>
            </span>
            <span :class="[prefixCls + '-title']">{{data.title}}</span>
            <Tree-node v-if="data.expand" v-for="(item,i) in children" :data="item"></Tree-node>
        </li>
    </ul>
</template>
<script>
    const prefixCls = 'tree';
    export default {
        name: 'TreeNode',
        props: {
            data: {
                type: Object
            }
        },
        computed: {
            arrowClasses() {
                return [
                    `${prefixCls}-arrow`,
                    {
                        [`${prefixCls}-arrow-open`]: this.data.expand
                    }
                ];
            },
            children() {
                return this.data.children;
            },
            showArrow() {
                return this.data.children && this.data.children.length;
            }
        },
        methods: {
            handleExapnd(e) {
                const item = this.data;
                if (item.children && item.children.length) {
                    this.$set(this.data, 'expand', !this.data.expand);
                }
            }
        },
        data() {
            return { prefixCls: prefixCls };
        }
    };
</script>
