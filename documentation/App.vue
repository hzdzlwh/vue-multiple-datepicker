<template>
    <div class="app">
        <div class="container">
            <multipleDatepicker placeholder="请选择日期" v-model="dateValue"></multipleDatepicker>
        </div>
    </div>
</template>

<script>
import multipleDatepicker from '../src/datepicker/index';

export default {
    name: 'app',
    data() {
        return {
            dateValue: ''
        }
    },
    components: {
        multipleDatepicker
    }
}
</script>

<style lang="scss">
.container{
    margin: 30px;
    text-align: center;
}
</style>
