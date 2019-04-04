import Tree from './tree.vue';
import './tree.less';
Tree.install = function(Vue) {
    Vue.component('Tree', Tree);
};
export default Tree;
