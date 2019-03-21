<template>
    <div :class="wrapClasses" :style="styles">
        <div :class="classes">
            <!-- head -->
            <div :class="[prefixCls + '-header']" ref="header" @mousewheel="handleMouseWheel" v-if="showHeader">
                <table cellspacing="0" cellpadding="0" border="0" :style="theadStyle">
                    <colgroup>
                        <col v-for="(column, index) in cloneColumns" :width="setCellWidth(column)">
                    </colgroup>
                    <thead>
                        <tr v-for="(cols, rowIndex) in headRows">
                            <th
                                v-for="(column, index) in cols"
                                :colspan="column.colSpan"
                                :rowspan="column.rowSpan"
                                :class="alignCls(column)"
                            >
                                <div :class="cellClasses(column)">
                                    <span>{{column.title || "#"}}</span>
                                </div>
                            </th>
                            <th v-if="showVerticalScrollBar && rowIndex===0" :class="scrollBarCellClass()" :rowspan="headRows.length"></th>
                        </tr>
                    </thead>
                </table>
            </div>
            <!-- body -->
            <div
                :class="[prefixCls +'-body']"
                ref="body"
                :style="bodyStyle"
                @scroll="handleBodyScroll"
                v-show="!(!data || data.length === 0)"
            >
                <table cellspacing="0" cellpadding="0" border="0" ref="tbody" :style="tbodyStyle">
                    <colgroup>
                        <col v-for="(column, index) in cloneColumns" :width="setCellWidth(column)">
                    </colgroup>
                    <tbody :class="[prefixCls + '-tbody']">
                        <template v-for="(row, index) in cloneData">
                            <tr
                                :class="rowClasses(row._index)"
                                @mouseenter.stop="handleMouseIn(row._index)"
                                @mouseleave.stop="handleMouseOut(row._index)"
                            >
                                <td v-for="column in columns" :class="alignCls(column, row)">
                                    <div ref="cell" :class="cellClass">
                                        <template v-if="column.render">
                                            <table-expand :row="row" :column="column" :index="index" :render="column.render"></table-expand>
                                        </template>
                                        <template v-else-if="column.type === 'index'">
                                            <span>{{ index + 1 }}</span>
                                        </template>
                                        <template v-else>
                                            <span class="t-table-cell-tooltip-content">{{row[column.key]}}</span>
                                        </template>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <!-- NoDataText -->
            <div :class="[prefixCls + '-tip']" v-show="data && data.length === 0" :style="bodyStyle" @scroll="handleBodyScroll">
                <table cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                        <tr>
                            <td :style="{'height':bodyStyle.height,'width':`${this.headerWidth}px`}">
                                <span v-html="localeNoDataText" v-if="!data || data.length === 0"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    /**
     *
     *
     *
     */
    import TableExpand from './expand';
    import elementResizeDetectorMaker from 'element-resize-detector';
    const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    const MOZ_HACK_REGEXP = /^moz([A-Z])/;
    function camelCase(name) {
        return name
            .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
                return offset ? letter.toUpperCase() : letter;
            })
            .replace(MOZ_HACK_REGEXP, 'Moz$1');
    }
    const getStyle = function(element, styleName) {
        if (!element || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === 'float') {
            styleName = 'cssFloat';
        }
        try {
            const computed = document.defaultView.getComputedStyle(element, '');
            return element.style[styleName] || computed ? computed[styleName] : null;
        } catch (e) {
            return element.style[styleName];
        }
    };
    let cached;
    const getScrollBarSize = function(fresh) {
        // if (isServer) return 0;
        if (fresh || cached === undefined) {
            const inner = document.createElement('div');
            inner.style.width = '100%';
            inner.style.height = '200px';

            const outer = document.createElement('div');
            const outerStyle = outer.style;

            outerStyle.position = 'absolute';
            outerStyle.top = 0;
            outerStyle.left = 0;
            outerStyle.pointerEvents = 'none';
            outerStyle.visibility = 'hidden';
            outerStyle.width = '200px';
            outerStyle.height = '150px';
            outerStyle.overflow = 'hidden';

            outer.appendChild(inner);

            document.body.appendChild(outer);

            const widthContained = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            let widthScroll = inner.offsetWidth;

            if (widthContained === widthScroll) {
                widthScroll = outer.clientWidth;
            }

            document.body.removeChild(outer);

            cached = widthContained - widthScroll;
        }
        return cached;
    };

    function typeOf(obj) {
        const toString = Object.prototype.toString;
        const map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        return map[toString.call(obj)];
    }
    // deepCopy
    function deepCopy(data) {
        const t = typeOf(data);
        let o;

        if (t === 'array') {
            o = [];
        } else if (t === 'object') {
            o = {};
        } else {
            return data;
        }

        if (t === 'array') {
            for (let i = 0; i < data.length; i++) {
                o.push(deepCopy(data[i]));
            }
        } else if (t === 'object') {
            for (let i in data) {
                o[i] = deepCopy(data[i]);
            }
        }
        return o;
    }
    // 设置随机ID
    const getRandomStr = function(len = 32) {
        const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        const maxPos = $chars.length;
        let str = '';
        for (let i = 0; i < len; i++) {
            str += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    };
    // 多个表头
    const getAllColumns = function(cols, forTableHead = false) {
        const columns = deepCopy(cols);
        const result = [];
        columns.forEach(column => {
            if (column.children) {
                if (forTableHead) result.push(column);
                result.push.apply(result, getAllColumns(column.children, forTableHead));
            } else {
                result.push(column);
            }
        });
        return result;
    };
    const convertColumnOrder = function(columns, fixedType) {
        let list = [];
        let other = [];
        columns.forEach(col => {
            if (col.fixed && col.fixed === fixedType) {
                list.push(col);
            } else {
                other.push(col);
            }
        });
        return list.concat(other);
    };
    // 多级表头
    const convertToRows = function(columns, fixedType = false) {
        const originColumns = fixedType ? (fixedType === 'left' ? deepCopy(convertColumnOrder(columns, 'left')) : deepCopy(convertColumnOrder(columns, 'right'))) : deepCopy(columns);
        let maxLevel = 1; //最高等级
        const traverse = (column, parent) => {
            if (parent) {
                column.level = parent.level + 1;
                if (maxLevel < column.level) {
                    maxLevel = column.level;
                }
            }
            if (column.children) {
                let colSpan = 0;
                column.children.forEach(subColumn => {
                    traverse(subColumn, column);
                    colSpan += subColumn.colSpan;
                });
                column.colSpan = colSpan;
            } else {
                column.colSpan = 1;
            }
        };

        originColumns.forEach(column => {
            column.level = 1;
            traverse(column);
        });

        const rows = [];
        for (let i = 0; i < maxLevel; i++) {
            rows.push([]);
        }

        const allColumns = getAllColumns(originColumns, true);

        allColumns.forEach(column => {
            if (!column.children) {
                column.rowSpan = maxLevel - column.level + 1;
            } else {
                column.rowSpan = 1;
            }
            rows[column.level - 1].push(column);
        });

        return rows;
    };

    const prefixCls = 't-table';
    let rowKey = 1;
    let columnKey = 1;
    export default {
        props: {
            columns: {
                type: Array,
                default() {
                    return [];
                }
            },
            data: {
                type: Array,
                default() {
                    return [];
                }
            },
            fixed: {
                type: [Boolean, String],
                default: false
            },
            width: {
                type: [Number, String]
            },
            height: {
                type: [Number, String]
            },
            stripe: {
                type: Boolean,
                default: true
            },
            border: {
                type: Boolean,
                default: false
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            highlightRow: {
                type: Boolean,
                default: false
            },
            rowClassName: {
                type: Function,
                default() {
                    return '';
                }
            },
            context: {
                type: Object
            },
            noDataText: {
                type: String
            },
            noFilteredDataText: {
                type: String
            },
            disabledHover: {
                type: Boolean
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        components: { TableExpand },
        data() {
            const colsWithId = this.makeColumnsWidthId(this.columns);
            return {
                prefixCls: prefixCls,
                tableWidth: 0,
                headerWidth: 0,
                cloneColumns: this.makeColumns(colsWithId),
                cloneData: this.makeData(),
                columnsWidth: {},
                showVerticalScrollBar: false,
                objData: this.makeObjData(), // checkbox or highlight-row
                scrollBarWidth: getScrollBarSize(),
                columnRows: this.makeColumnRows(false, colsWithId),
                leftFixedColumnRows: this.makeColumnRows('left', colsWithId),
                rightFixedColumnRows: this.makeColumnRows('right', colsWithId),
                ready: false,
                bodyHeight: 0
            };
        },
        computed: {
            wrapClasses() {
                return [
                    `${prefixCls}-wrapper`,
                    {
                        [`${prefixCls}-hide`]: !this.ready,
                        [`${prefixCls}-with-header`]: this.showSlotHeader,
                        [`${prefixCls}-with-footer`]: this.showSlotFooter
                    }
                ];
            },
            classes() {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-border`]: this.border,
                        [`${prefixCls}-stripe`]: this.stripe,
                        [`${prefixCls}-with-fixed-top`]: !!this.height
                    }
                ];
            },
            styles() {
                let style = {};
                if (this.height) {
                    const height = parseInt(this.height);
                    style.height = `${height}px`;
                }
                if (this.width) style.width = `${this.width}px`;
                return style;
            },
            headerStyle() {
                let style = {};
                if (this.tableWidth !== 0) {
                    let width = '';
                    width = this.tableWidth;
                    style.width = `${width}px`;
                }
                return style;
            },
            theadStyle() {
                let style = {};
                if (this.tableWidth !== 0) {
                    let width = '';
                    width = this.tableWidth;
                    style.width = `${width}px`;
                }
                return style;
            },
            bodyStyle() {
                let style = {};
                if (this.bodyHeight !== 0) {
                    const height = this.bodyHeight;
                    style.height = `${height}px`;
                }
                return style;
            },
            tbodyStyle() {
                let style = {};
                if (this.tableWidth !== 0) {
                    let width = '';
                    if (this.bodyHeight === 0) {
                        width = this.tableWidth;
                    } else {
                        width = this.tableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
                    }
                    //                    const width = this.bodyHeight === 0 ? this.tableWidth : this.tableWidth - this.scrollBarWidth;
                    style.width = `${width}px`;
                }
                return style;
            },
            // fixedTableStyle() {},
            // fixedRightTableStyle() {},
            localeNoDataText() {
                return '暂无数据';
            },
            // localeNoFilteredDataText() {
            //     return '无过滤数据';
            // },
            headRows() {
                // 多头判断
                const isGroup = this.columnRows.length > 1;
                if (isGroup) {
                    return this.fixed ? this.fixedColumnRows : this.columnRows;
                } else {
                    return [this.cloneColumns];
                }
            },
            cellClass() {
                return [
                    `${this.prefixCls}-cell`,
                    {
                        // [`${this.prefixCls}-hidden`]: !this.fixed && this.column.fixed && (this.column.fixed === 'left' || this.column.fixed === 'right'),
                        // [`${this.prefixCls}-cell-ellipsis`]: this.column.ellipsis || false
                        // [`${this.prefixCls}-cell-with-expand`]: this.renderType === 'expand',
                        // [`${this.prefixCls}-cell-with-selection`]: this.renderType === 'selection'
                    }
                ];
            },
            isLeftFixed() {
                return this.columns.some(col => col.fixed && col.fixed === 'left');
            },
            isRightFixed() {
                return this.columns.some(col => col.fixed && col.fixed === 'right');
            }
        },
        methods: {
            scrollBarCellClass() {
                let hasRightFixed = false;
                for (let i in this.headRows) {
                    for (let j in this.headRows[i]) {
                        if (this.headRows[i][j].fixed === 'right') {
                            hasRightFixed = true;
                            break;
                        }
                        if (hasRightFixed) break;
                    }
                }
                return [
                    {
                        [`${this.prefixCls}-hidden`]: hasRightFixed
                    }
                ];
            },
            handleBodyScroll() {
                if (this.showHeader) this.$refs.header.scrollLeft = event.target.scrollLeft;
                // if (this.isLeftFixed) this.$refs.fixedBody.scrollTop = event.target.scrollTop;
                // if (this.isRightFixed) this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
                // this.hideColumnFilter();
            },
            handleMouseWheel(event) {
                const deltaX = event.deltaX;
                const $body = this.$refs.body;
                if (deltaX > 0) {
                    $body.scrollLeft = $body.scrollLeft + 10;
                } else {
                    $body.scrollLeft = $body.scrollLeft - 10;
                }
            },
            // 设置宽度
            setCellWidth(column) {
                let width = '';
                if (column.width) {
                    width = column.width;
                } else if (this.columnsWidth[column._index]) {
                    width = this.columnsWidth[column._index].width;
                }
                if (width === '0') width = '';

                return width;
            },
            handleResize() {
                let tableWidth = this.$el.offsetWidth - 1;
                let columnsWidth = {};
                let sumMinWidth = 0;
                let hasWidthColumns = [];
                let noWidthColumns = [];
                let maxWidthColumns = [];
                let noMaxWidthColumns = [];
                // 对cloneColumns中含有width
                this.cloneColumns.forEach(col => {
                    if (col.width) {
                        hasWidthColumns.push(col);
                    } else {
                        noWidthColumns.push(col);
                        if (col.minWidth) {
                            sumMinWidth += col.minWidth;
                        }
                        if (col.maxWidth) {
                            maxWidthColumns.push(col);
                        } else {
                            noMaxWidthColumns.push(col);
                        }
                    }
                    col._width = null;
                });
                // 统计不可更改的宽度
                let unUsableWidth = hasWidthColumns.map(cell => cell.width).reduce((a, b) => a + b, 0);
                // 统计可用于更改的宽度
                let usableWidth = tableWidth - unUsableWidth - sumMinWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0) - 1;
                //
                let usableLength = noWidthColumns.length;

                let columnWidth = 0;

                if (usableWidth > 0 && usableLength > 0) {
                    columnWidth = parseInt(usableWidth / usableLength);
                }

                for (let i = 0; i < this.cloneColumns.length; i++) {
                    const column = this.cloneColumns[i];
                    let width = columnWidth + (column.minWidth ? column.minWidth : 0);
                    if (column.width) {
                        width = column.width;
                    } else {
                        if (column._width) {
                            width = column._width;
                        } else {
                            if (column.minWidth > width) {
                                width = column.minWidth;
                            } else if (column.maxWidth < width) {
                                width = column.maxWidth;
                            }

                            if (usableWidth > 0) {
                                usableWidth -= width - (column.minWidth ? column.minWidth : 0);
                                usableLength--;
                                if (usableLength > 0) {
                                    columnWidth = parseInt(usableWidth / usableLength);
                                } else {
                                    columnWidth = 0;
                                }
                            } else {
                                columnWidth = 0;
                            }
                        }
                    }
                    column._width = width;
                    columnsWidth[column._index] = {
                        width: width
                    };
                }
                if (usableWidth > 0) {
                    usableLength = noMaxWidthColumns.length;
                    columnWidth = parseInt(usableWidth / usableLength);
                    for (let i = 0; i < noMaxWidthColumns.length; i++) {
                        const column = noMaxWidthColumns[i];
                        let width = column._width + columnWidth;
                        if (usableLength > 1) {
                            usableLength--;
                            usableWidth -= columnWidth;
                            columnWidth = parseInt(usableWidth / usableLength);
                        } else {
                            columnWidth = 0;
                        }

                        column._width = width;

                        columnsWidth[column._index] = {
                            width: width
                        };
                    }
                }

                this.tableWidth = this.cloneColumns.map(cell => cell._width).reduce((a, b) => a + b, 0) + (this.showVerticalScrollBar ? this.scrollBarWidth : 0) + 1;
                this.columnsWidth = columnsWidth;
                this.fixedHeader();
            },
            fixedHeader() {
                if (this.height) {
                    this.$nextTick(() => {
                        const titleHeight = parseInt(getStyle(this.$refs.title, 'height')) || 0;
                        const headerHeight = parseInt(getStyle(this.$refs.header, 'height')) || 0;
                        const footerHeight = parseInt(getStyle(this.$refs.footer, 'height')) || 0;
                        this.bodyHeight = this.height - titleHeight - headerHeight - footerHeight;
                        this.$nextTick(() => this.fixedBody());
                    });
                } else {
                    this.bodyHeight = 0;
                    this.$nextTick(() => this.fixedBody());
                }
            },
            fixedBody() {
                if (this.$refs.header) {
                    this.headerWidth = this.$refs.header.children[0].offsetWidth;
                    this.headerHeight = this.$refs.header.children[0].offsetHeight;
                }

                if (!this.$refs.tbody || !this.data || this.data.length === 0) {
                    this.showVerticalScrollBar = false;
                } else {
                    let bodyContentEl = this.$refs.tbody;
                    let bodyEl = bodyContentEl.parentElement;
                    let bodyContentHeight = bodyContentEl.offsetHeight;
                    let bodyHeight = bodyEl.offsetHeight;
                    this.showHorizontalScrollBar = bodyEl.offsetWidth < bodyContentEl.offsetWidth + (this.showVerticalScrollBar ? this.scrollBarWidth : 0);

                    this.showVerticalScrollBar = this.bodyHeight ? bodyHeight - (this.showHorizontalScrollBar ? this.scrollBarWidth : 0) < bodyContentHeight : false;
                    if (this.showVerticalScrollBar) {
                        bodyEl.classList.add(this.prefixCls + '-overflowY');
                    } else {
                        bodyEl.classList.remove(this.prefixCls + '-overflowY');
                    }
                    if (this.showHorizontalScrollBar) {
                        bodyEl.classList.add(this.prefixCls + '-overflowX');
                    } else {
                        bodyEl.classList.remove(this.prefixCls + '-overflowX');
                    }
                }
            },
            //row,cellClasses
            cellClasses(column) {
                return [
                    `${this.prefixCls}-cell`,
                    {
                        [`${this.prefixCls}-hidden`]: !this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'),
                        [`${this.prefixCls}-cell-with-selection`]: column.type === 'selection'
                    }
                ];
            },
            rowClasses(_index) {
                return [
                    `${this.prefixCls}-row`,
                    this.rowClassName(this.objData[_index], _index),
                    {
                        [`${this.prefixCls}-row-highlight`]: this.objData[_index] && this.objData[_index]._isHighlight,
                        [`${this.prefixCls}-row-hover`]: this.objData[_index] && this.objData[_index]._isHover
                    }
                ];
            },
            // 处理hover
            handleMouseIn(_index) {
                if (this.disabledHover) return;
                if (this.objData[_index]._isHover) return;
                this.objData[_index]._isHover = true;
            },
            handleMouseOut(_index) {
                if (this.disabledHover) return;
                this.objData[_index]._isHover = false;
            },
            // set status for rowsData
            makeObjData() {
                let data = {};
                this.data.forEach((row, index) => {
                    const newRow = deepCopy(row); //todo 直接替换
                    newRow._isHover = false;
                    newRow._index = index;
                    if (newRow._disabled) {
                        newRow._isDisabled = newRow._disabled;
                    } else {
                        newRow._isDisabled = false;
                    }
                    if (newRow._checked) {
                        newRow._isChecked = newRow._checked;
                    } else {
                        newRow._isChecked = false;
                    }
                    if (newRow._expanded) {
                        newRow._isExpanded = newRow._expanded;
                    } else {
                        newRow._isExpanded = false;
                    }
                    if (newRow._highlight) {
                        newRow._isHighlight = newRow._highlight;
                    } else {
                        newRow._isHighlight = false;
                    }
                    data[index] = newRow;
                });
                return data;
            },
            // 处理数据
            makeData() {
                let data = deepCopy(this.data);
                data.forEach((row, index) => {
                    row._index = index;
                    row._rowKey = rowKey++;
                });
                return data;
            },
            makeColumns(cols) {
                let columns = deepCopy(getAllColumns(cols));
                let left = [];
                let right = [];
                let center = [];
                columns.forEach((column, index) => {
                    column._index = index;
                    column._columnKey = columnKey++;
                    column.width = parseInt(column.width);
                    column._width = column.width ? column.width : ''; // update in handleResize()
                    column._sortType = 'normal';
                    column._filterVisible = false;
                    column._isFiltered = false;
                    column._filterChecked = [];
                    // 过滤的处理
                    if ('filterMultiple' in column) {
                        column._filterMultiple = column.filterMultiple;
                    } else {
                        column._filterMultiple = true;
                    }
                    if ('filteredValue' in column) {
                        column._filterChecked = column.filteredValue;
                        column._isFiltered = true;
                    }
                    if ('sortType' in column) {
                        column._sortType = column.sortType;
                    }
                    // 如果左右有固定内容的时候处理
                    if (column.fixed && column.fixed === 'left') {
                        left.push(column);
                    } else if (column.fixed && column.fixed === 'right') {
                        right.push(column);
                    } else {
                        center.push(column);
                    }
                });
                // 排列顺序
                return left.concat(center).concat(right);
            },
            // 修改列，设置一个隐藏的 id，便于后面的多级表头寻找对应的列，否则找不到
            makeColumnsWidthId(columns) {
                return columns.map(item => {
                    if ('children' in item) this.makeColumnsWidthId(item.children);
                    item.__id = getRandomStr(6);
                    return item;
                });
            },
            // create a multiple table-head
            makeColumnRows(fixedType, cols) {
                return convertToRows(cols, fixedType);
            },
            alignCls(column, row = {}) {
                let cellClassName = '';
                if (row.cellClassName && column.key && row.cellClassName[column.key]) {
                    cellClassName = row.cellClassName[column.key];
                }
                return [
                    {
                        [`${cellClassName}`]: cellClassName, // cell className
                        [`${column.className}`]: column.className, // column className
                        [`${this.prefixCls}-column-${column.align}`]: column.align,
                        [`${this.prefixCls}-hidden`]: (this.fixed === 'left' && column.fixed !== 'left') || (this.fixed === 'right' && column.fixed !== 'right') || (!this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'))
                    }
                ];
            }
        },
        created() {},
        mounted() {
            this.handleResize();
            this.$nextTick(() => (this.ready = true));
            this.observer = elementResizeDetectorMaker();
            this.observer.listenTo(this.$el, this.handleResize);
        },
        beforeDestroy() {
            this.observer.removeListener(this.$el, this.handleResize);
        },

        watch: {
            data: {
                handler() {},
                deep: true
            },
            columns: {
                handler() {},
                deep: true
            },
            showHorizontalScrollBar() {
                this.handleResize();
            },
            showVerticalScrollBar() {
                this.handleResize();
            }
        }
    };
</script>
<style lang="less" scoped>
@css-prefix : t-;
@border-color-base : #dcdee2; // outside
@text-color : #515a6e;
@font-size-small : 12px;
@border-color-split : #e8eaec; // inside
@border-color-base : #dcdee2; // outside
@transition-time : .2s;
@table-thead-bg : #f8f8f9;
@table-td-stripe-bg : #f8f8f9;
@table-td-hover-bg : #ebf7ff;
@table-td-highlight-bg : #ebf7ff;
@font-size-base : 14px;
@shadow-color : rgba(0, 0, 0, .2);
@shadow-right : 1px 0 6px @shadow-color;
@ease-in-out : ease-in-out;
@table-prefix-cls: ~'@{css-prefix}table';
@table-thead-bg : #f8f8f9;
@table-select-item-prefix-cls: ~'@{table-prefix-cls}-filter-select-item';
.@{table-prefix-cls} {
    &-wrapper {
        position: relative;
        border: 1px solid @border-color-base;
        border-bottom: 0;
        border-right: 0;
    }
    width: inherit;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    color: @text-color;
    font-size: @font-size-small;
    background-color: #fff;

    box-sizing: border-box;
    //position: relative;

    &-hide {
        opacity: 0;
    }

    &:before {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: @border-color-base;
        z-index: 1;
    }

    &:after {
        content: '';
        width: 1px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-color: @border-color-base;
        z-index: 3;
    }

    &-with-header {
        //border-radius: @border-radius-base @border-radius-base 0 0;
    }

    &-with-footer {
        //border: 1px solid @border-color-base;
        //border-radius: 0 0 @border-radius-base @border-radius-base;
    }

    &-with-header&-with-footer {
        //border-radius: @border-radius-base;
    }

    &-title,
    &-footer {
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid @border-color-split;
    }
    &-footer {
        border-bottom: none;
    }

    &-header {
        overflow: hidden;
    }
    &-body {
        //overflow: auto;
        //position: relative;
    }
    &-overflowX {
        overflow-x: scroll;
    }
    &-overflowY {
        overflow-y: scroll;
    }
    &-tip {
        overflow-x: auto;
        overflow-y: hidden;
        //position: relative;
    }

    &-with-fixed-top&-with-footer {
        .@{table-prefix-cls}-footer {
            border-top: 1px solid @border-color-base;
        }
        tbody tr:last-child td {
            border-bottom: none;
        }
    }

    th,
    td {
        min-width: 0;
        height: 48px;
        box-sizing: border-box;
        text-align: left;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid @border-color-split;
    }

    th {
        height: 40px;
        white-space: nowrap;
        overflow: hidden;
        background-color: @table-thead-bg;
    }
    td {
        background-color: #fff;
        transition: background-color @transition-time @ease-in-out;
    }

    th&-column,
    td&-column {
        &-left {
            text-align: left;
        }
        &-center {
            text-align: center;
        }
        &-right {
            text-align: right;
        }
    }

    & table {
        //width: 100%;
        table-layout: fixed;
    }
    &-border {
        th,
        td {
            border-right: 1px solid @border-color-split;
        }
    }
    &-cell {
        padding-left: 18px;
        padding-right: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        box-sizing: border-box;

        &-ellipsis {
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &-tooltip {
            width: 100%;
            &-content {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        &-with-expand {
            height: 47px;
            line-height: 47px;
            padding: 0;
            text-align: center;
        }

        &-expand {
            cursor: pointer;
            transition: transform @transition-time @ease-in-out;
            i {
                font-size: @font-size-base;
            }
            &-expanded {
                transform: rotate(90deg);
            }
        }
        &-sort {
            cursor: pointer;
            user-select: none;
        }

        // #3159
        // &-with-selection {
        //     .@{checkbox-prefix-cls}-wrapper {
        //         margin-right: 0;
        //     }
        // }
    }
    &-hidden {
        visibility: hidden;
    }
    th &-cell {
        display: inline-block;

        word-wrap: normal;
        vertical-align: middle;
    }

    td&-expanded-cell {
        padding: 20px 50px;
        background: @table-thead-bg;
    }

    &-stripe &-body,
    &-stripe &-fixed-body {
        tr:nth-child(2n) {
            td {
                background-color: @table-td-stripe-bg;
            }
        }
        // #1380
        tr.@{table-prefix-cls}-row-hover {
            td {
                background-color: @table-td-hover-bg;
            }
        }
    }

    tr&-row-hover {
        td {
            background-color: @table-td-hover-bg;
        }
    }

    // &-large {
    //     font-size: @font-size-base;
    //     th {
    //         height: 48px;
    //     }
    //     td {
    //         height: 60px;
    //     }
    //     &-title,
    //     &-footer {
    //         height: 60px;
    //         line-height: 60px;
    //     }
    //     .@{table-prefix-cls}-cell-with-expand {
    //         height: 59px;
    //         line-height: 59px;
    //         i {
    //             font-size: @font-size-base+2;
    //         }
    //     }
    // }

    // &-small {
    //     th {
    //         height: 32px;
    //     }
    //     td {
    //         height: 40px;
    //     }
    //     &-title,
    //     &-footer {
    //         height: 40px;
    //         line-height: 40px;
    //     }
    //     .@{table-prefix-cls}-cell-with-expand {
    //         height: 39px;
    //         line-height: 39px;
    //     }
    // }

    &-row-highlight,
    tr&-row-highlight&-row-hover,
    &-stripe &-body tr&-row-highlight:nth-child(2n),
    &-stripe &-fixed-body tr&-row-highlight:nth-child(2n) {
        td {
            background-color: @table-td-highlight-bg;
        }
    }

    // &-fixed,
    // &-fixed-right {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     box-shadow: 2px 0 6px -2px rgba(0, 0, 0, 0.2);

    //     &::before {
    //         content: '';
    //         width: 100%;
    //         height: 1px;
    //         background-color: @border-color-base;
    //         position: absolute;
    //         left: 0;
    //         bottom: 0;
    //         z-index: 4;
    //     }
    // }
    // &-fixed-right {
    //     top: 0;
    //     left: auto;
    //     right: 0;
    //     box-shadow: -2px 0 6px -2px rgba(0, 0, 0, 0.2);
    // }
    // &-fixed-right-header {
    //     position: absolute;
    //     top: -1px;
    //     right: 0;
    //     background-color: @table-thead-bg;
    //     border-top: 1px solid @border-color-base;
    //     border-bottom: 1px solid @border-color-split;
    // }
    // &-fixed-header {
    //     overflow: hidden;
    //     // 在 #1387 里，添加了下面的代码，但是在 #5174 会出现新的问题。
    //     // 但是，在新版本里，注释掉后，#1387 的问题并没有再复现，所以注释掉
    //     //&-with-empty{
    //     //    .@{table-prefix-cls}-hidden{
    //     //        .@{table-prefix-cls}-sort{
    //     //            display: none;
    //     //        }
    //     //        .@{table-prefix-cls}-cell span{
    //     //            display: none;
    //     //        }
    //     //    }
    //     //}
    // }
    &-fixed-body {
        overflow: hidden;
        position: relative;
        z-index: 3;
    }

    &-fixed-shadow {
        width: 1px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        box-shadow: @shadow-right;
        overflow: hidden;
        z-index: 1;
    }

    &-sort {
        // .sortable();
    }
    // &-filter {
    //     display: inline-block;
    //     cursor: pointer;
    //     position: relative;
    //     //top: 1px;

    //     i {
    //         // color: @btn-disable-color;
    //         // transition: color @transition-time @ease-in-out;
    //         // &:hover {
    //         //     color: inherit;
    //         // }
    //         // &.on {
    //         //     color: @primary-color;
    //         // }
    //     }
    //     &-list {
    //         padding: 8px 0 0;
    //         &-item {
    //             padding: 0 12px 8px;

    //             .ivu-checkbox-wrapper + .ivu-checkbox-wrapper {
    //                 margin: 0;
    //             }
    //             label {
    //                 display: block;

    //                 & > span {
    //                     margin-right: 4px;
    //                 }
    //             }
    //         }
    //         ul {
    //             padding-bottom: 8px;
    //         }
    //         // .select-item(@table-prefix-cls, @table-select-item-prefix-cls);
    //     }
    //     &-footer {
    //         padding: 4px;
    //         border-top: 1px solid @border-color-split;
    //         overflow: hidden;
    //         button:first-child {
    //             float: left;
    //         }
    //         button:last-child {
    //             float: right;
    //         }
    //     }
    // }

    &-tip {
        table {
            width: 100%;
            td {
                text-align: center;
            }
        }
    }

    &-expanded-hidden {
        visibility: hidden;
    }
}
.ivu-table-popper {
    min-width: 0;
    text-align: left;
    .ivu-poptip-body {
        padding: 0;
    }
}
</style>

