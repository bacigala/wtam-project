import React from "react";
import "./Calendar.css";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  TodayButton,
  CurrentTimeIndicator
} from '@devexpress/dx-react-scheduler-material-ui';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import 'moment/locale/sk'
import { withStyles } from '@material-ui/core/styles';

const style = ({ palette }) => ({
  });

const formatTimeScaleDate = date => moment(date).format('HH:mm');

const TimeScaleLabel = (
    { formatDate, ...restProps },
  ) => <WeekView.TimeScaleLabel {...restProps} formatDate={formatTimeScaleDate} />;

const formatDayScaleDate = (date, options) => {
    const { weekday } = options;
    return getDayFromDateString(date, weekday);
};

const getDayFromDateString = (date, weekday) => {
  moment.locale('sk');
  const momentDate = moment(date);
  if(weekday) {
    const day = momentDate.format('dddd'); 
    return day.charAt(0).toUpperCase() + day.slice(1);
  }
  return momentDate.format('D');
}

const getTimeFromDateString = (date) => {
  moment.locale('sk');
  const momentDate = moment(date);
  return momentDate.format('LT');
}

const getDateFromDateString = (date) => {
  moment.locale('sk');
  const momentDate = moment(date);
  return momentDate.format('l');
}

const styles = {
    dayScaleCell: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };

const DayScaleCell = withStyles(styles, 'DayScaleCell')((
    { formatDate, classes, ...restProps },
  ) => (
    <WeekView.DayScaleCell
      {...restProps}
      formatDate={formatDayScaleDate}
      className={classes.dayScaleCell}
    />
  ));

  const Header = withStyles(style, { name: 'Header' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Header {...restProps} className="headerPopup">
      <h2 className="title">{appointmentData.title}</h2>
    </AppointmentTooltip.Header>
  ));

const Content = withStyles(style, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <div className="popup">
        <h3 className="gymName">{appointmentData.gym}</h3>
        <div className="plan">
          <p>Tréningový plán</p>
          <ul className="list">
              {appointmentData.plan.map(e => <li>{e}</li>)}
          </ul>
        </div>
        <div className="entered">
          <p>Prihlásený</p>
          <ul className="list">
              {appointmentData.prihlaseny.map(e => <li>{e}</li>)}
          </ul>
        </div>
        <div className="trainer">
          <div className="imageWrapper">
            <img src="./logo192.png"/>
          </div>
          <p>{appointmentData.trener}</p>
          <a href="/profile"><button>Profil</button></a>
        </div>
        <p className="day">{getDayFromDateString(appointmentData.startDate, true)}</p>
        <p className="date">Dátum: {getDateFromDateString(appointmentData.startDate)}</p>
        <p className="from">Od: {getTimeFromDateString(appointmentData.startDate)}</p>
        <p className="to">Do: { getTimeFromDateString(appointmentData.endDate)}</p>
        <a href="/" className="sign"><button>Prihlásiť</button></a>
    </div>
  ));

class Calendar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            currentDate: '2021-11-30',
        };
        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
        this.updateInterval = 60000;
    }

    componentDidMount() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: "2021-11-05 12:12:12", to: "2022-12-20 12:12:12"})
      };
      fetch('/api/calendar', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({appointments: data}));
    }
        
    render() {
        const { appointments, currentDate } = this.state;
        console.log(this.state);
        return (
            <section className="calendar">
                <Scheduler data={appointments}>                       
                    <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange}/>
                    <WeekView
                        displayName="Môj kalendár"
                        timeScaleLabelComponent={TimeScaleLabel}
                        dayScaleCellComponent={DayScaleCell}
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                    <AppointmentTooltip
                        headerComponent={Header}
                        contentComponent={Content}
                        showCloseButton
                    />
                    <CurrentTimeIndicator
                        updateInterval={this.updateInterval}
                     />
                </Scheduler>
            </section>
        );
    }
}

export default Calendar;