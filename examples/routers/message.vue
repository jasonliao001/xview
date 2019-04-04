<template>
    <div>
        <Button type="primary" @click="info">Display info prompt</Button>
        <Button @click="success">Display success prompt</Button>
        <Button @click="warning">Display warning prompt</Button>
        <Button @click="error">Display error prompt</Button>
        <Button @click="loading">Display loading...</Button>
        <Button @click="closable">Display a closable message</Button>
        <Button @click="MessageV2">MessageV2</Button>
    </div>
</template>
<script>
    export default {
        methods: {
            info() {
                this.$Message.info({
                    content: '这是一条普通的提示',
                    duration: 1000
                });
            },
            success() {
                this.$Message.success('This is a success tip');
            },
            warning() {
                this.$Message.warning('This is a warning tip');
            },
            error() {
                this.$Message.error('This is an error tip');
            },
            loading() {
                const msg = this.$Message.loading({
                    content: 'Loading...',
                    duration: 0
                });
                setTimeout(msg, 3000);
            },
            closable() {
                this.$Message.info({
                    content: 'Tips for manual closing',
                    duration: 1000,
                    closable: true
                });
            },
            MessageV2() {
                this.$MessageV2.info({
                    content: 'Tips for manual closing',
                    render: h => {
                        return h('Input', {
                            props: {
                                placeholder: 'Please enter your name...'
                            },
                            on: {
                                input: value => {
                                    console.log(value);
                                }
                            }
                        });
                    }
                });
            }
        }
    };
</script>
