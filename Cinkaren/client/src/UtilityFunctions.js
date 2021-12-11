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

function getDateFromDateString(date) {
  moment.locale('sk');
  const momentDate = moment(date);
  return momentDate.format('l');
};

export {formatDayScaleDate, getDayFromDateString, getTimeFromDateString, getDateFromDateString};