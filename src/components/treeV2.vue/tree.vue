<template>
    <div class="tree">
        <Tree-node v-for="(item, i) in stateTree" :data="item"></Tree-node>
        <p v-if="!stateTree.length">暂无数据</p>
    </div>
</template>
<script>
    import TreeNode from './node.vue';
    import { deepCopy } from './utils.js';
    export default {
        props: {
            data: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                stateTree: this.convertStateTree(this.data)
            };
        },
        computed: {},
        methods: {
            //添加
            convertStateTree(data) {
                let stateTree = deepCopy(data);
                const addKey = node => {
                    this.$set(node, 'expand', true);
                    if (node.children && node.children.length) {
                        node.children.forEach(child => {
                            addKey(child);
                        });
                    }
                };
                stateTree.forEach(rootNode => {
                    addKey(rootNode);
                });
                return stateTree;
            },
            compileFlatState() {
                let keyCounter = 0;
                let childrenKey = this.childrenKey;
                const flatTree = [];
                function flattenChildren(node, parent) {
                    node.nodeKey = keyCounter++;
                    flatTree[node.nodeKey] = { node: node, nodeKey: node.nodeKey };
                    if (typeof parent != 'undefined') {
                        flatTree[node.nodeKey].parent = parent.nodeKey;
                        flatTree[parent.nodeKey][childrenKey].push(node.nodeKey);
                    }
                    if (node[childrenKey]) {
                        flatTree[node.nodeKey][childrenKey] = [];
                        node[childrenKey].forEach(child => flattenChildren(child, node));
                    }
                }
                this.stateTree.forEach(rootNode => {
                    flattenChildren(rootNode);
                });
                return flatTree;
            },
            updateTreeDown() {},
            updateTreeUp() {}
        },
        components: {
            TreeNode
        },
        created() {}
    };
</script>



