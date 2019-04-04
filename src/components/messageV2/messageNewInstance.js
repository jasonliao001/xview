import message from './message.vue';
import Vue from 'vue';
message.newInstance = properties => {
    const _props = properties || {};
    const Instance = new Vue({
        data: {
            width: '100px'
        },
        render(h) {
            return h(message, {
                props: Object.assign({}, _props, {
                    width: this.width
                })
            });
        }
    });
    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    console.log(component);
    const notification = Instance.$children[0];
    return {
        component: notification
    };
};
export default message;
