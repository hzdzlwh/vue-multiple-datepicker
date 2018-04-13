/*
get first day of month
*/

export function getFirstDayOfMonth(month) {
    return new Date(month.getFullYear(), month.getMonth(), 1);
}

/* get days number of month */
export function getDayCountInMonth(month) {
    const resultDate = getFirstDayOfMonth(month);

    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);
    return resultDate.getDate();
}

/* get all date on month*/
export function getDayOfMonth(month) {
    const daysInMonth = getDayCountInMonth(month);
    const days = [];
    for(let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(month.getFullYear(), month.getMonth(), i));
    }
    return days;
}

export function getRows(month) {
    const rows = [];
    let week = [];
    const days = getDayOfMonth(month);
    const addWeek = (item) => {
        const emptyDays = 7 - week.length;
        const prevMonthDayCount = rows.length
            ? 0
            : getDayCountInMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
        for (let i = 0; i < emptyDays; ++i) {
            if (rows.length) {
                item.push(new Date(month.getFullYear(), month.getMonth() + 1, i + 1));
            } else {
                item.unshift(new Date(month.getFullYear(), month.getMonth() - 1, prevMonthDayCount - i))
            }
        }
        rows.push(item);
    };
    days.map((day) => {
        if (week.length > 0 && day.getDay() === 1) {
            addWeek(week);
            week = [];
        }

        week.push(day);

        if (days.indexOf(day) === days.length - 1) {
            addWeek(week);
        }
    });
    return rows;
}

export function formatDate(date) {
    if (!(date instanceof Date)) {
        return date;
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month }-${day < 10 ? '0' + day : day}`;
}

/**
 * @param {any} date1
 * @param {any} date2
 * @returns
 * @description 判断两个日期是否是同一天
 */
export function isSameDate(date1, date2) {
    return formatDate(date1) === formatDate(date2);
}
