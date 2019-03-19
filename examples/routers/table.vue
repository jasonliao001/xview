<template>
    <div>
        <Table ref="currentRowTable" stripe :columns="columns3" :data="data1"></Table>

        <Button @click="handleClearCurrentRow">Clear</Button>

        <tableV2
            border
            :columns="[{
                        title: 'Name',
                        key: 'name',
                         align: 'center',
                      
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        align: 'center',
              
                    },
                    {
                        title: 'Address',
                        key: 'address',
             
                    },
                    {
                        title: 'Title',
                        key: 'date',
                        
                    }]"
        ></tableV2>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                columns3: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                        fixed: 'left',
                        indexMethod(row) {
                            return row._index;
                        }
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        border: true,
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
                        address:
                            '自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引，详见示例。自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引，详见示例。自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引，详见示例。',
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
                ]
            };
        },
        methods: {
            handleClearCurrentRow() {
                this.$refs.currentRowTable.clearCurrentRow();
            }
        }
    };
</script>
