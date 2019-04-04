<template>
    <div>
        <Table ref="currentRowTable" stripe :columns="columns3" :data="data1"></Table>
        <Button @click="handleClearCurrentRow">Clear</Button>
        <tableV2
            border
            align="center"
            :data="data2"
            :row-class-name="rowClassName"
            :columns="[{
                        title: '',
                        type:'index',
                        width:'60'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                    },
                    {
                        title: 'Address',
                        key: 'address',
                    },
                    {
                        title: '操作',
                        key: 'date',
                        render:(h, params) => {
                            return h(
                                'div',[
                                    h('span', {
                                        domProps: {
                                            innerHTML: '确认'
                                        },
                                        style:{
                                            border: '1px solid #ddd',
                                            padding: '2px 20px',
                                            cursor: 'pointer',
                                            borderRadius:'8px',
                                            fontSize:'12px',
                                            display: 'inline-block',
                                            marginRight:'10px' 
                                        },
                                        on:{
                                            click: () => {
                                                    this.show(params.index)
                                            }
                                        }
                                }),
                                 h('span', {
                                        domProps: {
                                            innerHTML: '取消'
                                        },
                                        style:{
                                            border: '1px solid #ddd',
                                            padding: '2px 20px',
                                            cursor: 'pointer',
                                            borderRadius:'8px',
                                            fontSize:'12px',
                                            display: 'inline-block'
                                        },
                                        on:{
                                            click: () => {
                                                    this.show(params.row)
                                            }
                                        }
                                })
                                ]
                            )
                        }
                    }]"
        ></tableV2>

        <form action="Handler1.ashx" method="post">
            <p>
                客户名称:
                <input type="text" name="CustomerName" style="width: 300px">
            </p>
            <p>
                客户电话:
                <input type="text" name="CustomerTel" style="width: 300px">
            </p>
            <p>
                <input type="submit" value="提交">
            </p>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                columns3: [
                    {
                        align: 'center',
                        key: 'date',
                        align: 'center',
                        title: 'date',
                        fixed: 'left'
                        // indexMethod(row) {
                        //     return row._index;
                        // }
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        align: 'center'
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        tooltip: true
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: '自定义渲染列，使用第一个是 ',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park自定义渲染列，使用 Vue 的 Render 函',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                data2: []
            };
        },
        methods: {
            handleClearCurrentRow() {
                this.data2 = this.data1;
                // this.$refs.currentRowTable.clearCurrentRow();
            },
            rowClassName(row, index) {},
            show(index) {
                console.log('show------', index);
            }
        }
    };
</script>
