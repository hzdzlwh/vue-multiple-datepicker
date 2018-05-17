<template>
    <span class="multiple-datepicker" v-clickoutside="hideCalendar">
        <span class="multiple-datepicker-input">
            <input
                :placeholder="placeholder"
                class="multiple-input"
                type="text"
                @focus="handleFocus"
                v-model="dateStr"/>
        </span>
        <calendar v-show="calendarVisible" @select="handleSelect" @changeDate="handleChangeDate" :defaultValue="value"></calendar>
    </span>
</template>

<script>
import calendar from './calendar.vue';
import Clickoutside from '../utils/clickoutside.js';
import { formatDate } from './utils.js';

export default {
    name: 'multipleDatepicker',
    props: {
        placeholder: String,
        value: String
    },
    data() {
        return {
            calendarVisible: false,
            date: [],
            dateStr: '',
            changedByInput: false
        }
    },
    methods: {
        showCalendar() {
            this.calendarVisible = true;
        },
        hideCalendar() {
            this.calendarVisible = false;
        },
        handleFocus() {
            !this.calendarVisible && this.showCalendar();
        },
        handleSelect() {
            this.hideCalendar();
        },
        handleChangeDate(date) {
            if (this.changedByInput) {
                this.changedByInput = false;
                return;
            }
            this.date = date;
        }
    },
    watch: {
        date(newVal) {
            if (!this.changedByInput) {
                this.dateStr = '';
                newVal.forEach((value, index) => {
                    if (index === newVal.length - 1) {
                        this.dateStr += formatDate(value);
                    } else {
                        this.dateStr += formatDate(value) + ',';
                    }
                });
            }
            this.$emit('input', this.dateStr);
        }
    },
    components: {
        calendar
    },
    directives: {
        Clickoutside
    }
}
</script>

<style lang="scss">
.multiple-datepicker{
    position: relative;
    display: inline-block;
    .multiple-input{
        width: 220px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
    }
}
</style>
