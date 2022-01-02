import moment from 'moment';
import 'moment/locale/sk'

function formatDayScaleDate(date, options) {
    const { weekday } = options;
    return getDayFromDateString(date, weekday);
};

function getDayFromDateString(date, weekday) {
  moment.locale('sk');
  const momentDate = moment(date);
  if(weekday) {
    const day = momentDate.format('dddd'); 
    return day.charAt(0).toUpperCase() + day.slice(1);
  }
  return momentDate.format('D');
};

function getTimeFromDateString(date) {
  moment.locale('sk');
  const momentDate = moment(date);
  return momentDate.format('LT');
};

function getHoursFromDateString(date) {
  moment.locale('sk');
  const momentDate = moment(date);
  return momentDate.hour();
};

function getWeekNumberFromDate(date) {
  moment.locale('sk');
  const momentDate = moment(date);
  return momentDate.week();
};

function getYearFromDate(date) {
  moment.locale('sk');
  const momentDate = moment(date);
  return momentDate.year();
};

function getBegginingOfWeek(date) {
  moment.locale('en');
  const momentDate = moment(date);
  return momentDate.startOf('week').toDate();
};

function getEndOfWeek(date) {
  moment.locale('en');
  const momentDate = moment(date);
  return momentDate.endOf('week').toDate();
};

function getDateFromDateString(date, locale = "sk") {
  moment.locale(locale);
  const momentDate = moment(date);
  return momentDate.format('l');
};

function getDayNameFromDateString (dateStr, locale = "sk-SK") {
  let date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: 'long' });        
}

export {
  formatDayScaleDate, 
  getDayFromDateString, 
  getTimeFromDateString, 
  getDateFromDateString, 
  getDayNameFromDateString, 
  getHoursFromDateString, 
  getWeekNumberFromDate, 
  getYearFromDate,
  getBegginingOfWeek,
  getEndOfWeek
};