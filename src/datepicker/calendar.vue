<template>
    <div class="multiple-datepicker-calendar">
        <div class="multiple-datepicker-header">
            <i class="multiple-datepicker-icon multiple-datepicker-icon-prev-year" @click="changeYear(year - 1)"></i>
            <i class="multiple-datepicker-icon multiple-datepicker-icon-prev-month" @click="changeMonth(month - 1)"></i>
            <span class="multiple-datepicker-year-month">{{ `${year}年${month + 1}月`}}</span>
            <i class="multiple-datepicker-icon multiple-datepicker-icon-next-month" @click="changeMonth(month + 1)"></i>
            <i class="multiple-datepicker-icon multiple-datepicker-icon-next-year" @click="changeYear(year + 1)"></i>
        </div>
        <div>
            <table class="multiple-datepicker-table">
                <thead>
                    <tr>
                        <th v-for="WEEK in WEEKS" :key="WEEK">{{WEEK}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, Rowindex) in rows" :key="Rowindex">
                        <td v-for="(day, index) in row" :key="index">
                            <div :class="getCellClasses(day)" @click="selectDate(day)">
                                {{isSameDate(day, new Date()) ? '今' : day.getDate()}}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { getRows, isSameDate } from './utils.js';
import { formatDate } from './utils.js';

export default {
    name: 'calendar',
    props: {
        defaultValue: [String, Date],
        disabledDate: Function
    },
    data() {
        return {
            date: [],
            WEEKS: ['一', '二', '三', '四', '五', '六', '日'],
            year: null,
            month: null
        }
    },
    created() {
        if (this.date.length < 1 && !this.year) {
            this.year = new Date().getFullYear();
            this.month = new Date().getMonth();
        }
    },
    computed: {
        rows() {
            const date = new Date(this.year, this.month, 1);
            return getRows(date);
        }
    },
    methods: {
        selectDate(day) {
            if (typeof this.disabledDate === 'function' && this.disabledDate(day)) {
                return false;
            }
            const findIndex = this.date.findIndex(value => {
                return formatDate(value) === formatDate(day);
            });
            if (findIndex > -1) {
                this.date.splice(findIndex, 1);
            } else {
                this.date.push(day);
            }
            this.$emit('changeDate', this.date);
        },
        changeMonth(month) {
            if (month === -1) {
                this.month = 11;
                this.year --;
            } else if (month === 12) {
                this.month = 0;
                this.year ++;
            } else {
                this.month = month;
            }
        },
        changeYear(year) {
            this.year = year;
        },
        getCellClasses(cell) {
            const classes = ['multiple-datepicker-date'];
            if (cell.getFullYear() < this.year || cell.getMonth() < this.month) {
                classes.push('multiple-datepicker-prev-month');
            }
            if (cell.getFullYear() > this.year || cell.getMonth() > this.month) {
                classes.push('multiple-datepicker-next-month');
            }
            if (cell.getMonth() === this.month) {
                classes.push('multiple-datepicker-normal');
            }
            if (isSameDate(cell, new Date())) {
                classes.push('multiple-datepicker-today');
            }
            if (typeof this.disabledDate === 'function' && this.disabledDate(cell)) {
                classes.push('multiple-datepicker-cell-disabled')
            }
            this.date.forEach(day => {
                if (isSameDate(cell, day)) {
                    classes.push('multiple-datepicker-current');
                }
            });
            return classes.join(' ');
        },
        isSameDate(date1, date2) {
            return isSameDate(date1, date2);
        }
    },
    watch: {
        // date(newVal) {
        //     const today = new Date();
        //     this.year = newVal ? newVal.getFullYear() : today.getFullYear();
        //     this.month = newVal ? newVal.getMonth() : today.getMonth();
        //     this.$emit('changeDate', this.date);
        // }
    }
}
</script>

<style lang="scss">
.multiple-datepicker-calendar{
    background: #fff;
    position: absolute;
    left: 0;
    top: 34px;
    margin-top: 4px;
    padding: 8px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    z-index: 1060;
    .multiple-datepicker-header{
        margin: 8px 0;
        .multiple-datepicker-year-month{
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            display: inline-block;
            margin: 0 29px;
            min-width: 64px;
        }
        .multiple-datepicker-icon{
            cursor: pointer;
            width: 8px;
            height: 8px;
            display: inline-block;
            background: no-repeat center;
            user-select: none;
            &.multiple-datepicker-icon-prev-year{
                margin-left: 8px;
                background-image: url('images/double-left-arrow.png');
            }
            &.multiple-datepicker-icon-prev-month{
                margin-left: 16px;
                background-image: url('images/left-arrow.png');
            }
            &.multiple-datepicker-icon-next-year{
                background-image: url('images/double-right-arrow.png');
            }
            &.multiple-datepicker-icon-next-month{
                margin-right: 16px;
                background-image: url('images/right-arrow.png');
            }
        }
    }
    .multiple-datepicker-table{
        table-layout: fixed;
        width: 231px;
        font-size: 14px;
        border-spacing: 0;
        border-collapse: collapse;
        td, th{
            width: 33px;
            height: 35px;
            text-align: center;
        }
        th{
            color: #999;
            font-weight: normal;
        }
        tbody td{
            .multiple-datepicker-prev-month, .multiple-datepicker-next-month{
                color: #ccc;
            }
            .multiple-datepicker-date{
                width: 24px;
                height: 24px;
                border-radius: 2px;
                line-height: 24px;
                margin: auto;
                cursor: pointer;
                transition: background .2s ease-in-out;
                &:hover{
                    background: #178ce6;
                }
            }
            .multiple-datepicker-today{
                color: blue;
            }
            .multiple-datepicker-current{
                background: blue;
                color: #fff;
            }
            .multiple-datepicker-cell-disabled {
                color: #ccc;
            }
        }
    }
}
</style>
