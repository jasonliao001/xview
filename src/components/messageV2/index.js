import MessageV2 from './messageNewInstance.js';
let messageInstance;
function getMessageInstance(render = undefined) {
    messageInstance =
        messageInstance ||
        MessageV2.newInstance({
            render: render
        });
    return messageInstance;
}
function MessageV2Notice(options) {
    let instance = getMessageInstance(options.render);
}
export default {
    name: 'MessageV2',
    info(options) {
        return this.MessageV2(options);
    },
    MessageV2(options) {
        return MessageV2Notice(options);
    }
};
