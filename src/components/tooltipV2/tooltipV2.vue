<template>
    <div :class="[prefixCls]" @mouseenter="handleShowPopper" @mouseleave="handleClosePopper">
        <!-- 需要相对定位的声明 -->
        <div :class="[prefixCls + '-rel']" ref="reference">
            <slot></slot>
        </div>
        <!-- 弹出层 -->
        <transition name="fade">
            <div
                :class="[prefixCls + '-popper', prefixCls + '-' + theme]"
                :style="dropStyles"
                ref="popper"
                v-show="!disabled && (visible || always)"
                @mouseenter="handleShowPopper"
                @mouseleave="handleClosePopper"
            >
                <!-- :data-transfer="transfer"
                v-transfer-dom-->
                <div :class="[prefixCls + '-content']">
                    <div :class="[prefixCls + '-arrow']"></div>
                    <div :class="innerClasses" :style="innerStyles">
                        <slot name="content">{{ content }}</slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Popper from './popper';

    const oneOf = function(value, validList = []) {
        return validList.some(validValue => validValue === value);
    };

    const prefixCls = 'ivu-tooltip';

    export default {
        name: 'Tooltip',
        // directives: { TransferDom },
        mixins: [Popper],
        props: {
            placement: {
                validator(value) {
                    return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
                },
                default: 'bottom'
            },
            content: {
                type: [String, Number],
                default: ''
            },
            delay: {
                type: Number,
                default: 100
            },
            disabled: {
                type: Boolean,
                default: false
            },
            controlled: {
                // under this prop,Tooltip will not close when mouseleave
                type: Boolean,
                default: false
            },
            always: {
                type: Boolean,
                default: false
            },
            // transfer: {
            //     type: Boolean,
            //     default() {
            //         return !this.$IVIEW || this.$IVIEW.transfer === '' ? false : this.$IVIEW.transfer;
            //     }
            // },
            theme: {
                validator(value) {
                    return oneOf(value, ['dark', 'light']);
                },
                default: 'dark'
            },
            maxWidth: {
                type: [String, Number]
            }
        },
        data() {
            return {
                prefixCls: prefixCls
                // tIndex: this.handleGetIndex()
            };
        },
        computed: {
            innerStyles() {
                const styles = {};
                if (this.maxWidth) styles['max-width'] = `${this.maxWidth}px`;
                return styles;
            },
            innerClasses() {
                return [
                    `${prefixCls}-inner`,
                    {
                        [`${prefixCls}-inner-with-width`]: !!this.maxWidth
                    }
                ];
            },
            dropStyles() {
                let styles = {};
                // if (this.transfer) styles['z-index'] = 1060 + this.tIndex;
                return styles;
            }
        },
        watch: {
            content() {
                this.updatePopper();
            }
        },
        methods: {
            handleShowPopper() {
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.visible = true;
                }, this.delay);
                // this.tIndex = this.handleGetIndex();
            },
            handleClosePopper() {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                    if (!this.controlled) {
                        this.timeout = setTimeout(() => {
                            this.visible = false;
                        }, 100);
                    }
                }
            }
            // handleGetIndex() {
            //     transferIncrease();
            //     return transferIndex;
            // }
        },
        mounted() {
            if (this.always) {
                this.updatePopper();
            }
        }
    };
</script>
<style lang="less" scoped>
@zindex-tooltip : 1060;
@font-size-small: 12px;
@line-height-base : 1.5;
.popper(@arrow, @arrow-width, @arrow-distance, @bg) {
    display: block;
    visibility: visible;
    font-size: @font-size-small;
    line-height: @line-height-base;
    position: absolute;
    z-index: @zindex-tooltip;

    &[x-placement^='top'] {
        padding: @arrow-width 0 @arrow-distance 0;
    }
    &[x-placement^='right'] {
        padding: 0 @arrow-width 0 @arrow-distance;
    }
    &[x-placement^='bottom'] {
        padding: @arrow-distance 0 @arrow-width 0;
    }
    &[x-placement^='left'] {
        padding: 0 @arrow-distance 0 @arrow-width;
    }

    &[x-placement^='top'] .@{arrow} {
        bottom: @arrow-distance - @arrow-width;
        border-width: @arrow-width @arrow-width 0;
        border-top-color: @bg;
    }
    &[x-placement='top'] .@{arrow} {
        left: 50%;
        margin-left: -@arrow-width;
    }
    &[x-placement='top-start'] .@{arrow} {
        left: 16px;
    }
    &[x-placement='top-end'] .@{arrow} {
        right: 16px;
    }

    &[x-placement^='right'] .@{arrow} {
        left: @arrow-distance - @arrow-width;
        border-width: @arrow-width @arrow-width @arrow-width 0;
        border-right-color: @bg;
    }
    &[x-placement='right'] .@{arrow} {
        top: 50%;
        margin-top: -@arrow-width;
    }
    &[x-placement='right-start'] .@{arrow} {
        top: 8px;
    }
    &[x-placement='right-end'] .@{arrow} {
        bottom: 8px;
    }

    &[x-placement^='left'] .@{arrow} {
        right: @arrow-distance - @arrow-width;
        border-width: @arrow-width 0 @arrow-width @arrow-width;
        border-left-color: @bg;
    }
    &[x-placement='left'] .@{arrow} {
        top: 50%;
        margin-top: -@arrow-width;
    }
    &[x-placement='left-start'] .@{arrow} {
        top: 8px;
    }
    &[x-placement='left-end'] .@{arrow} {
        bottom: 8px;
    }

    &[x-placement^='bottom'] .@{arrow} {
        top: @arrow-distance - @arrow-width;
        border-width: 0 @arrow-width @arrow-width;
        border-bottom-color: @bg;
    }
    &[x-placement='bottom'] .@{arrow} {
        left: 50%;
        margin-left: -@arrow-width;
    }
    &[x-placement='bottom-start'] .@{arrow} {
        left: 16px;
    }
    &[x-placement='bottom-end'] .@{arrow} {
        right: 16px;
    }
}
@tooltip-bg : rgba(70, 76, 91, .9);
@tooltip-color : #fff;
@border-radius-small : 4px;
// Shadow
@shadow-color : rgba(0, 0, 0, .2);
@shadow-base : @shadow-down;
@shadow-card : 0 1px 1px 0 rgba(0,0,0,.1);
@shadow-up : 0 -1px 6px @shadow-color;
@shadow-down : 0 1px 6px @shadow-color;
@shadow-left : -1px 0 6px @shadow-color;
@shadow-right : 1px 0 6px @shadow-color;
@text-color : #515a6e;

@css-prefix: t-;
@tooltip-prefix-cls: ~'@{css-prefix}tooltip';
@tooltip-arrow: ~'@{tooltip-prefix-cls}-arrow';
@tooltip-max-width: 250px;
@tooltip-arrow-width: 5px;
@tooltip-distance: @tooltip-arrow-width - 1 + 4;

@tooltip-arrow-width-light: 7px;
@tooltip-distance-light: @tooltip-arrow-width-light - 1 + 4;
@tooltip-arrow-outer-width-light: (@tooltip-arrow-width-light + 1);
@tooltip-arrow-color: hsla(0, 0%, 85%, 0.5);

.@{tooltip-prefix-cls} {
    display: inline-block;

    &-rel {
        display: inline-block;
        position: relative;
        width: inherit;
    }

    &-popper {
        .popper(@tooltip-arrow, @tooltip-arrow-width, @tooltip-distance, @tooltip-bg);
    }
    &-light&-popper {
        .popper(@tooltip-arrow, @tooltip-arrow-width-light, @tooltip-distance-light, @tooltip-arrow-color);

        &[x-placement^='top'] .@{tooltip-arrow}:after {
            content: ' ';
            bottom: 1px;
            margin-left: -@tooltip-arrow-width-light;
            border-bottom-width: 0;
            border-top-width: @tooltip-arrow-width-light;
            border-top-color: #fff;
        }

        &[x-placement^='right'] .@{tooltip-arrow}:after {
            content: ' ';
            left: 1px;
            bottom: -@tooltip-arrow-width-light;
            border-left-width: 0;
            border-right-width: @tooltip-arrow-width-light;
            border-right-color: #fff;
        }

        &[x-placement^='bottom'] .@{tooltip-arrow}:after {
            content: ' ';
            top: 1px;
            margin-left: -@tooltip-arrow-width-light;
            border-top-width: 0;
            border-bottom-width: @tooltip-arrow-width-light;
            border-bottom-color: #fff;
        }

        &[x-placement^='left'] .@{tooltip-arrow}:after {
            content: ' ';
            right: 1px;
            border-right-width: 0;
            border-left-width: @tooltip-arrow-width-light;
            border-left-color: #fff;
            bottom: -@tooltip-arrow-width-light;
        }
    }

    &-inner {
        max-width: @tooltip-max-width;
        min-height: 34px;
        padding: 8px 12px;
        color: @tooltip-color;
        text-align: left;
        text-decoration: none;
        background-color: @tooltip-bg;
        border-radius: @border-radius-small;
        box-shadow: @shadow-base;
        white-space: nowrap;

        &-with-width {
            white-space: pre-wrap;
            text-align: justify;
        }
    }

    &-light &-inner {
        background-color: #fff;
        color: @text-color;
    }

    &-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }

    &-light {
        .@{tooltip-arrow} {
            &:after {
                display: block;
                width: 0;
                height: 0;
                position: absolute;
                border-color: transparent;
                border-style: solid;
                content: '';
                border-width: @tooltip-arrow-width-light;
            }
            border-width: @tooltip-arrow-outer-width-light;
        }
    }
}
</style>
