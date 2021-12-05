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
      <h2 className="title">{appointmentData.name}</h2>
    </AppointmentTooltip.Header>
  ));

const Content = withStyles(style, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <div className="popup">
        <h3 className="gymName">{appointmentData.gym_name}</h3>
        <div className="plan">
          <p>Tréningový plán</p>
          <ul className="list">
              {appointmentData.plan.map(e => <li>{e}</li>)}
          </ul>
        </div>
        <div className="entered">
          <p>Prihlásený</p>
          <ul className="list">
              {appointmentData.users.map(e => <li>{e.name + " " + e.surname}</li>)}
          </ul>
        </div>
        <div className="trainer">
          <div className="imageWrapper">
            <img src="./logo192.png"/>
          </div>
          <p>{appointmentData.trainer_name + " " + appointmentData.trainer_surname} </p>
          <a href="/profile"><button>Profil</button></a>
        </div>
        <p className="day">{getDayFromDateString(appointmentData.startDate, true)}</p>
        <p className="date">Dátum: {getDateFromDateString(appointmentData.startDate)}</p>
        <p className="from">Od: {getTimeFromDateString(appointmentData.startDate)}</p>
        <p className="to">Do: { getTimeFromDateString(appointmentData.endDate)}</p>
        <a href="/" className="sign"><button>Prihlásiť</button></a>
    </div>
  ));

const CustomAppointment = ({ style, ...restProps }) => {
  return (
    <Appointments.Appointment
      {...restProps}
      style={{ ...style, backgroundColor: "green" }}
      className="CLASS_ROOM2"
    />
  );
};
  
const AppointmentContent = ({ style, ...restProps }) => {
  return (
    <Appointments.AppointmentContent {...restProps}>
      <div className={restProps.container}>
        <p className="appointment_name">{restProps.data.name}</p>
        <p className="appointment_from">Od: {getTimeFromDateString(restProps.data.from)}</p>
        <p className="appointment_to">Do:{getTimeFromDateString(restProps.data.to)}</p>
      </div>
    </Appointments.AppointmentContent>
  );
};

class Calendar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            currentDate: moment(),
        };
        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
        this.updateInterval = 60000;
    }
    /*
    componentDidMount() {
      fetch('/api/calendar?from=2021-12-01 12:00:00&to=2021-12-25 12:00:00')
        .then(response => response.json())
        .then(data => this.setState({appointments: data}));
    }*/

    componentDidMount() {
      fetch('/api/calendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: "2021-12-01 12:00:00",
            to: "2021-12-25 12:00:00",
          })
        }).then(response => response.json())
        .then(data => this.setState({appointments: data.events}));
    }
        
    render() {
        const { appointments, currentDate } = this.state;
        console.log(appointments);
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
                    <Appointments 
                      appointmentComponent={CustomAppointment}
                      appointmentContentComponent={AppointmentContent}
                    />
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