import Moment from 'moment-timezone';
//设置语言
Moment.locale(LOCALE);

//返回Moment对象
export const moment = Moment;

//反回时区设置
export const utcOffset = function (time) {
    return moment(time).utcOffset(TIMEZONE);
}