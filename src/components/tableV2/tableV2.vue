<template>
    <div :class="wrapClasses" :style="styles">
        <div :class="classes">
            <!-- 表头 -->
            <div :class="[prefixCls + '-theader']" ref="header" @mousewheel="handleMouseWheel">
                <table cellspacing="0" cellpadding="0" border="0" :style="headerStyle">
                    <colgroup>
                        <col v-for="(column, index) in columns" :width="setCellWidth(column)">
                    </colgroup>
                    <thead>
                        <tr v-for="(cols, rowIndex) in headRows">
                            <th>
                                <div :class="cellClasses(column)">
                                    <span>{{column.title}}</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <!-- body -->
            <div :class="[prefixCls +'-body']" ref="body" :style="bodyStyle">
                <table cellspacing="0" cellpadding="0" border="0">
                    <colgroup>
                        <col v-for="(column, index) in columns" :width="setCellWidth(column)">
                    </colgroup>
                    <tbody :class="[prefixCls + '-tbody']">
                        <template v-for="(row, index) in data">
                            <tr :class="{[prefixCls + '-expanded-hidden']: fixed}">
                                <td :colspan="columns.length"></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <!-- NoDataText -->
            <div :class="[prefixCls + '-tip']" :style="bodyStyle" @scroll="handleBodyScroll">
                <table cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                        <tr>
                            <td :style="{'height':bodyStyle.height,'width':`${this.headerWidth}px`}">
                                <span v-html="localeNoDataText" v-if="!data || data.length === 0"></span>
                                <span v-html="localeNoFilteredDataText" v-else></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- isLeftFixed -->
            <div :class="[prefixCls + '-fixed']" :style="fixedTableStyle" v-if="isLeftFixed"></div>
            <!-- isRightFixed -->
            <div :class="[prefixCls + '-fixed-right']" :style="fixedRightTableStyle" v-if="isRightFixed"></div>
        </div>
        <!-- todo add loading -->
    </div>
</template>
<script>
    const prefixCls = 'v-table';
    export default {
        data() {
            return {
                columns: [],
                headRows: [],
                prefixCls: prefixCls,
                data: [],
                isLeftFixed: false,
                isRightFixed: false
            };
        },
        props: {
            fixed: {
                type: [Boolean, String],
                default: false
            }
        },
        computed: {
            wrapClasses() {},
            styles() {},
            headerStyle() {},
            bodyStyle() {},
            classes() {},
            fixedTableStyle() {},
            fixedRightTableStyle() {}
        },
        methods: {
            setCellWidth() {},
            handleBodyScroll() {},
            handleMouseWheel() {}
        }
    };
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
</style>

