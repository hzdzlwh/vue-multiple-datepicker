<template>
    <span class="multiple-datepicker" v-clickoutside="hideCalendar">
        <span class="multiple-datepicker-input" @click="handleFocus">
            <div class="multiple-select_tags" ref="selectTagCon">
                <span v-for="d in formateDate">{{d}}</span>
            </div>
            <input
                :placeholder="placeholder"
                class="multiple-input"
                type="text"
                @focus="handleFocus"
                v-model="dateStr"
                ref="inputDom"/>
        </span>
        <calendar v-show="calendarVisible" @select="handleSelect" @changeDate="handleChangeDate" :defaultValue="value" :style="{top:calendarTop}"></calendar>
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
            changedByInput: false,
            calendarTop: ''
        }
    },
    computed: {
        formateDate() {
            return this.dateStr.split(',');
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
            this.$nextTick(() => {
                this.$refs.inputDom.style.height = this.formateDate.length > 2 ? this.$refs.selectTagCon.offsetHeight + 8 + 'px' : '32px';
                this.calendarTop = this.formateDate.length > 2 ? this.$refs.selectTagCon.offsetHeight + 'px' : '32px';
            });
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
    .multiple-select_tags{
        width: 220px;
        text-align: left;
        position: absolute;
        background: #fff;
        z-index: 1;
        margin: 3px;
        span{
            display: inline-block;
            background: #f0f2f5;
            margin: 3px;
            border-radius: 3px;
            margin: 2px;
        }
    }
}
</style>
