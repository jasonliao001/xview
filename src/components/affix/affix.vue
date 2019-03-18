<template>
    <!-- 图钉 -->
    <div>
        <div ref="point" :class="classes" :style="styles">
            <slot></slot>
        </div>
        <div v-show="slot" :style="slotStyle"></div>
    </div>
</template>
<script>
    // 知识点链接
    // https://wangdoc.com/javascript/dom/element.html
    // https://www.zhangxinxu.com/wordpress/2011/09/cssom%E8%A7%86%E5%9B%BE%E6%A8%A1%E5%BC%8Fcssom-view-module%E7%9B%B8%E5%85%B3%E6%95%B4%E7%90%86%E4%B8%8E%E4%BB%8B%E7%BB%8D/
    import { on, off } from '../../utils/dom';
    const prefixCls = 'ivu-affix';

    function getScroll(target, top) {
        // 页面滚动的距离，兼容性处理
        const prop = top ? 'pageYOffset' : 'pageXOffset';
        const method = top ? 'scrollTop' : 'scrollLeft';

        let ret = target[prop];
        // 对于不支持的pageYOffset typeof window.pageYOffset === undefined =====
        if (typeof ret !== 'number') {
            ret = window.document.documentElement[method];
        }
        return ret;
        console.log('this');
    }

    function getOffset(element) {
        const rect = element.getBoundingClientRect();

        const scrollTop = getScroll(window, true);
        const scrollLeft = getScroll(window);

        const docEl = window.document.body;
        const clientTop = docEl.clientTop || 0;
        const clientLeft = docEl.clientLeft || 0;

        return {
            top: rect.top + scrollTop - clientTop,
            left: rect.left + scrollLeft - clientLeft
        };
    }

    export default {
        name: 'Affix',
        props: {
            offsetTop: {
                type: Number,
                default: 0
            },
            offsetBottom: {
                type: Number
            }
        },
        data() {
            return {
                affix: false,
                styles: {},
                slot: false,
                slotStyle: {}
            };
        },
        computed: {
            offsetType() {
                let type = 'top';
                if (this.offsetBottom >= 0) {
                    type = 'bottom';
                }

                return type;
            },
            classes() {
                return [
                    {
                        [`${prefixCls}`]: this.affix
                    }
                ];
            }
        },
        mounted() {
            // 可以加上个节流函数
            //            window.addEventListener('scroll', this.handleScroll, false);
            //            window.addEventListener('resize', this.handleScroll, false);
            on(window, 'scroll', this.handleScroll);
            on(window, 'resize', this.handleScroll);
        },
        beforeDestroy() {
            //            window.removeEventListener('scroll', this.handleScroll, false);
            //            window.removeEventListener('resize', this.handleScroll, false);
            off(window, 'scroll', this.handleScroll);
            off(window, 'resize', this.handleScroll);
        },
        methods: {
            // 在滚动的时候时刻去设置距离顶部的高度
            handleScroll() {
                const affix = this.affix;
                const scrollTop = getScroll(window, true);
                const elOffset = getOffset(this.$el);
                const windowHeight = window.innerHeight;
                const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight;

                // Fixed Top
                if (elOffset.top - this.offsetTop < scrollTop && this.offsetType == 'top' && !affix) {
                    this.affix = true;
                    this.slotStyle = {
                        width: this.$refs.point.clientWidth + 'px',
                        height: this.$refs.point.clientHeight + 'px'
                    };
                    this.slot = true;
                    this.styles = {
                        top: `${this.offsetTop}px`,
                        left: `${elOffset.left}px`,
                        width: `${this.$el.offsetWidth}px`
                    };

                    this.$emit('on-change', true);
                } else if (elOffset.top - this.offsetTop > scrollTop && this.offsetType == 'top' && affix) {
                    this.slot = false;
                    this.slotStyle = {};
                    this.affix = false;
                    this.styles = null;

                    this.$emit('on-change', false);
                }

                // Fixed Bottom
                if (elOffset.top + this.offsetBottom + elHeight > scrollTop + windowHeight && this.offsetType == 'bottom' && !affix) {
                    this.affix = true;
                    this.styles = {
                        bottom: `${this.offsetBottom}px`,
                        left: `${elOffset.left}px`,
                        width: `${this.$el.offsetWidth}px`
                    };

                    this.$emit('on-change', true);
                } else if (elOffset.top + this.offsetBottom + elHeight < scrollTop + windowHeight && this.offsetType == 'bottom' && affix) {
                    this.affix = false;
                    this.styles = null;

                    this.$emit('on-change', false);
                }
            }
        }
    };
</script>
