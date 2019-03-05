<!--<template>-->
    <!--<div>-->
        <!--<Tree :data="baseData" :load-data="loadData" multiple :render="renderFunc"></Tree>-->
        <!--<Button @click="handleAdd">add</Button>-->
        <!--<Button @click="handleUpdate">update</Button>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->
        <!--data () {-->
            <!--return {-->
                <!--baseData: [-->
                    <!--{-->
                        <!--expand: true,-->
                        <!--title: 'parent 1',-->
                        <!--children: [-->
                            <!--{-->
                                <!--title: 'parent 1-0',-->
                                <!--expand: false,-->
                                <!--children: [],-->
                                <!--loading: false-->
                            <!--},-->
                            <!--{-->
                                <!--title: 'parent 1-1',-->
                                <!--expand: true,-->
                                <!--checked: true,-->
                                <!--children: [-->
                                    <!--{-->
                                        <!--title: 'leaf',-->
                                        <!--render: (h, { node }) => {-->
                                            <!--return h('Button', {-->
                                                <!--props: {-->
                                                    <!--type: 'primary',-->
                                                    <!--size: 'small'-->
                                                <!--},-->
                                                <!--on: {-->
                                                    <!--click: ({target}) => {-->
                                                        <!--this.logger(target.textContent);-->
                                                    <!--}-->
                                                <!--}-->
                                            <!--}, node.title + '000');-->
                                        <!--}-->
                                    <!--}-->
                                <!--]-->
                            <!--}-->
                        <!--]-->
                    <!--}-->
                <!--]-->
            <!--};-->
        <!--},-->
        <!--methods: {-->
            <!--handleAdd () {-->
                <!--this.baseData.push(-->
                    <!--{-->
                        <!--title: 'test name',-->
                        <!--checked: true-->
                    <!--}-->
                <!--);-->
            <!--},-->
            <!--handleUpdate () {-->
                <!--const child = this.baseData[0].children[0].children[1];-->
              <!--//  console.log(JSON.stringify(this.baseData), '\n', JSON.stringify(child));-->
                <!--if (!child) return this.$Message.error('Node is async and is not loaded yet');-->
                <!--else this.$set(child, 'checked', true);-->
            <!--},-->
            <!--logger (txt) {-->
                <!--console.log(txt);-->
            <!--},-->
            <!--loadData (item, callback) {-->
                <!--setTimeout(() => {-->
                    <!--callback([-->
                        <!--{-->
                            <!--title: 'children-1',-->
<!--//                            loading: false,-->
                            <!--children: []-->
                        <!--},-->
                        <!--{-->
                            <!--title: 'children-2',-->
<!--//                            loading: false,-->
                            <!--children: []-->
                        <!--}-->
                    <!--]);-->
                <!--}, 2000);-->
            <!--},-->
            <!--renderFunc (h, { node }) {-->
                <!--return h('Button', {-->
                    <!--props: {-->
                        <!--type: 'ghost'-->
                    <!--}-->
                <!--}, node.title)-->
            <!--}-->
        <!--}-->
    <!--};-->
<!--</script>-->


<!--<template>-->
    <!--<div style="width: 400px;">-->
        <!--<Tree :data="data4" :render="renderContent"></Tree>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->
        <!--data () {-->
            <!--return {-->
                <!--data4: [-->
                    <!--{-->
                        <!--title: 'parent 1',-->
                        <!--expand: true,-->
                        <!--children: [-->
                            <!--{-->
                                <!--title: 'parent 1-1',-->
                                <!--expand: true,-->
                                <!--children: [-->
                                    <!--{-->
                                        <!--title: 'leaf 1-1-1',-->
                                        <!--expand: true-->
                                    <!--},-->
                                    <!--{-->
                                        <!--title: 'leaf 1-1-2',-->
                                        <!--expand: true-->
                                    <!--}-->
                                <!--]-->
                            <!--},-->
                            <!--{-->
                                <!--title: 'parent 1-2',-->
                                <!--expand: true,-->
                                <!--children: [-->
                                    <!--{-->
                                        <!--title: 'leaf 1-2-1',-->
                                        <!--expand: true-->
                                    <!--},-->
                                    <!--{-->
                                        <!--title: 'leaf 1-2-1',-->
                                        <!--expand: true-->
                                    <!--}-->
                                <!--]-->
                            <!--}-->
                        <!--]-->
                    <!--}-->
                <!--],-->
                <!--buttonProps: {-->
                    <!--type: 'ghost',-->
                    <!--size: 'small',-->
                <!--}-->
            <!--}-->
        <!--},-->
        <!--methods: {-->
            <!--renderContent (h, { data, node, root }) {-->
                <!--return h('span', {-->
                    <!--style: {-->
                        <!--display: 'inline-block',-->
                        <!--width: '100%'-->
                    <!--}-->
                <!--}, [-->
                    <!--h('span', data.title),-->
                    <!--h('span', {-->
                        <!--style: {-->
                            <!--display: 'inline-block',-->
                            <!--float: 'right',-->
                            <!--marginRight: '32px'-->
                        <!--}-->
                    <!--}, [-->
                        <!--h('Button', {-->
                            <!--props: Object.assign({}, this.buttonProps, {-->
                                <!--icon: 'ios-plus-empty'-->
                            <!--}),-->
                            <!--style: {-->
                                <!--marginRight: '8px'-->
                            <!--},-->
                            <!--on: {-->
                                <!--click: () => { this.append(data) }-->
                            <!--}-->
                        <!--}),-->
                        <!--h('Button', {-->
                            <!--props: Object.assign({}, this.buttonProps, {-->
                                <!--icon: 'ios-minus-empty'-->
                            <!--}),-->
                            <!--on: {-->
                                <!--click: () => { this.remove(node, data, root) }-->
                            <!--}-->
                        <!--})-->
                    <!--])-->
                <!--]);-->
            <!--},-->
            <!--append (data) {-->
                <!--this.$set(data, 'children', [{-->
                    <!--title: 'appended node',-->
                    <!--expand: true-->
                <!--}]);-->
            <!--},-->
            <!--remove (node, data, root) {-->
                <!--const parentKey = root.find(el => el === node).parent;-->
                <!--const parent = root.find(el => el.nodeKey === parentKey).node;-->
                <!--const index = parent.children.indexOf(data);-->
                <!--parent.children.splice(index, 1);-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->

<template>
    <!-- <div>
        {{ data1 }}
            <Tree :data="data1" @on-select-change="getSelectedNodes" show-checkbox multiple></Tree>
        <TreeV2></TreeV2>
    </div>-->
    <div>
        <Tree :data="data5" :render="renderContent"></Tree>
        <functional :list="list" v-bind="data" v-on="data.on"></functional>
    </div>
</template>
<script>
    import functional from './functional.vue';
    export default {
        components: { functional },
        data() {
            return {
                list: [1, 2, 2, 3, 3, 4, 4],
                data: {
                    class: 'red',
                    on: {
                        click: e => {
                            console.log(e);
                        }
                    }
                },
                data5: [
                    {
                        title: 'parent 1',
                        expand: true,
                        render: (h, { root, node, data }) => {
                            console.log('render');
                            return h(
                                'span',
                                {
                                    style: {
                                        display: 'inline-block',
                                        width: '100%'
                                    }
                                },
                                [
                                    h('span', [
                                        h('Icon', {
                                            props: {
                                                type: 'ios-folder-outline'
                                            },
                                            style: {
                                                marginRight: '8px'
                                            }
                                        }),
                                        h('span', data.title)
                                    ]),
                                    h(
                                        'span',
                                        {
                                            style: {
                                                display: 'inline-block',
                                                float: 'right',
                                                marginRight: '32px'
                                            }
                                        },
                                        [
                                            h('Button', {
                                                props: Object.assign({}, this.buttonProps, {
                                                    icon: 'ios-add',
                                                    type: 'primary'
                                                }),
                                                style: {
                                                    width: '64px'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.append(data);
                                                    }
                                                }
                                            }),
                                            h('Button', {
                                                props: Object.assign({}, this.buttonProps, {
                                                    icon: 'ios-remove'
                                                }),
                                                on: {
                                                    click: () => {
                                                        this.remove(root, node, data);
                                                    }
                                                }
                                            })
                                        ]
                                    )
                                ]
                            );
                        },
                        children: [
                            {
                                title: 'child 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        expand: true
                                    }
                                ]
                            },
                            {
                                title: 'child 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small'
                },
                data1: [
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'parent 2',
                        expand: true,
                        children: [
                            {
                                title: 'parent 2-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 2-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                data2: []
            };
        },
        methods: {
            getSelectedNodes(callback, node) {
                node.expand = !node.expand;
            },
            renderContent(h, { root, node, data }) {
                console.log('renderContent');
                return h(
                    'span',
                    {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    },
                    [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'ios-paper-outline'
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', data.title)
                        ]),
                        h(
                            'span',
                            {
                                style: {
                                    display: 'inline-block',
                                    float: 'right',
                                    marginRight: '32px'
                                }
                            },
                            [
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-add'
                                    }),
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        click: () => {
                                            this.append(data);
                                        }
                                    }
                                }),
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-remove'
                                    }),
                                    on: {
                                        click: () => {
                                            this.remove(root, node, data);
                                        }
                                    }
                                })
                            ]
                        )
                    ]
                );
            },
            append(data) {
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove(root, node, data) {
                console.log('root :', root);
                console.log('data :', data);
                console.log('node :', node);
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            }
        }
    };
</script>
