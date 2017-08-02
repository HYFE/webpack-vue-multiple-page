<template>
    <ul v-if="list">
        <li v-for="item in list">{{item.name}}</li>
    </ul>
</template>
<script>
import test from 'api/test'

export default {
    data() {
        return {
            list: null
        }
    },
    created() {
        test.getList().then(data => {
            this.list = data
        })
    }
}
</script>
<style lang="less">
@import "~less/variables";
@import "~less/mixins";
</style>
