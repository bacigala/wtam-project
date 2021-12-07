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
import Cookies from 'universal-cookie';
import  { Navigate } from 'react-router'
import profile from "./No_Image.jpg"

class Calendar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            gymName: "",
            appointments: [],
            currentDate: new Date(moment()),
            range: this.getRange(new Date(moment()), "Week")
        };
        this.cookies = new Cookies();
        this.cookies = this.cookies.getAll();
        if(this.cookies.userdata && this.cookies.userdata.user) {
          this.userId = this.cookies.userdata.user.id
          this.userName = this.cookies.userdata.user.username;
        } else if(this.props.user) {
          this.redirect = true;
        }
        this.gymId = props.gymId;
        this.getGymName(this.gymId);
        this.updateInterval = 60000;
        console.log(this.cookies);
    }

    style = ({ palette }) => ({
    });
  
    formatTimeScaleDate = date => moment(date).format('HH:mm');
    
    TimeScaleLabel = (
        { formatDate, ...restProps },
      ) => <WeekView.TimeScaleLabel {...restProps} formatDate={this.formatTimeScaleDate} />;
    
    formatDayScaleDate = (date, options) => {
        const { weekday } = options;
        return this.getDayFromDateString(date, weekday);
    };
    
    getDayFromDateString = (date, weekday) => {
      moment.locale('sk');
      const momentDate = moment(date);
      if(weekday) {
        const day = momentDate.format('dddd'); 
        return day.charAt(0).toUpperCase() + day.slice(1);
      }
      return momentDate.format('D');
    }
    
    getTimeFromDateString = (date) => {
      moment.locale('sk');
      const momentDate = moment(date);
      return momentDate.format('LT');
    }
    
    getDateFromDateString = (date) => {
      moment.locale('sk');
      const momentDate = moment(date);
      return momentDate.format('l');
    }
    
    styles = {
        dayScaleCell: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      };
    
    DayScaleCell = withStyles(this.styles, 'DayScaleCell')((
        { formatDate, classes, ...restProps },
      ) => (
        <WeekView.DayScaleCell
          {...restProps}
          formatDate={this.formatDayScaleDate}
          className={classes.dayScaleCell}
        />
      ));
    
      Header = withStyles(this.style, { name: 'Header' })(({
        children, appointmentData, classes, ...restProps
      }) => (
        <AppointmentTooltip.Header {...restProps} className="headerPopup">
          <h2 className="title">{appointmentData.name}</h2>
        </AppointmentTooltip.Header>
      ));
    
    Content = withStyles(this.style, { name: 'Content' })(({
        children, appointmentData, classes, ...restProps
      }) => (
        <div className="popup">
            <h3 className="gymName">{appointmentData.gym_name}</h3>
            <div className="plan">
              <p className="titleOfList">Tréningový plán</p>
              <ul className="list">
                  {appointmentData.plan.map(e => <li>{e}</li>)}
              </ul>
            </div>
            <div className="entered">
              <div>
                <p className="titleOfList">Prihlásený</p>
                <p className="numOfEntered">{appointmentData.users.length}/{appointmentData.max_participants}</p>
              </div>
              <ul className="list">
                  {appointmentData.users.map(e => <li>{e.name + " " + e.surname}</li>)}
              </ul>
            </div>
            <div className="trainer">
              <div className="imageWrapper">
                <img src={profile} width="150" height="115"/>
              </div>
              <p>{appointmentData.trainer_name + " " + appointmentData.trainer_surname}</p>
              <a href="/profile"><button>Profil</button></a>
            </div>
            <p className="day">{this.getDayFromDateString(appointmentData.startDate, true)}</p>
            <p className="date">Dátum: {this.getDateFromDateString(appointmentData.startDate)}</p>
            <p className="from">Od: {this.getTimeFromDateString(appointmentData.startDate)}</p>
            <p className="to">Do: { this.getTimeFromDateString(appointmentData.endDate)}</p>
            {this.getTrainingButton(this.userId, appointmentData.id, appointmentData.users, appointmentData.users.length >= appointmentData.max_participants)}
        </div>
      ));
  
  getTrainingButton(id, eventId, users, full) {
    console.log(full);
    if(full){
      return (<p className="sign full">Plné!</p>)
    } else if(users.some(user => user.id == id)) {
      return (
        <button className="sign" type="submit" onClick={() => {this.signIntoTraining('/api/event/signout', id, eventId) }}>Odhlásiť</button>
      );
    } else {
      return (
        <button className="sign" type="submit" onClick={() => {this.signIntoTraining('/api/event/signin', id, eventId) }}>Prihlásiť</button>
      );
    }
  }
  
  signIntoTraining = (path, userId, eventId) => {
    fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        eventId: eventId,
      })
    });
    window.location.reload();
  };

  getGymName = (gymId) => {
    fetch('/api/gym/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: gymId
      })
    }).then(response => response.json())
    .then(data => {if(data.gyms.length != 0) this.setState({gymName: data.gyms[0].name})});
  };
  
  CustomAppointment = ({ style, ...restProps }) => {
    return (
      <Appointments.Appointment
        {...restProps}
        style={{ ...style, backgroundColor: "green" }}
        className="CLASS_ROOM2"
      />
    );
  };

    AppointmentContent = ({ style, ...restProps }) => {
      return (
        <Appointments.AppointmentContent {...restProps}>
          <div className="appointment">
            <p className="appointment_name">{restProps.data.name}</p>
            <p className="appointment_time_from">Od: {this.getTimeFromDateString(restProps.data.startDate)}</p>
            <p className="appointment_time_to">Do: {this.getTimeFromDateString(restProps.data.endDate)}</p>
            <p className="appointment_trainer">{restProps.data.trainer_name + " " + restProps.data.trainer_surname}</p>
          </div>
        </Appointments.AppointmentContent>
      );
    };
    
    getRange = (date, view) => {
      if (view === "Day") {
        return { startDate: date, endDate: date };
      }
      if (view === "Week") {
        let firstDay = date.getDate() - date.getDay();
        let lastDay = firstDay + 6;
        console.log(date);
        firstDay = new Date(date.setDate(firstDay));
        firstDay.setHours(0,0,0,0);
        lastDay = new Date(date.setDate(lastDay));
        lastDay.setHours(0,0,0,0);
        return {
          startDate: firstDay,
          endDate: lastDay
        };
      }
    };

    currentDateChange = currentDate => {
      let range = this.getRange(currentDate, "Week");
      this.setState({
        currentDate,
        range
      }, this.componentDidMount);
    };

    componentDidMount() {
      if (this.gymId) {
        fetch('/api/calendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: this.state.range.startDate,
            to: this.state.range.endDate,
            gym_id: this.gymId,
          })
        }).then(response => response.json())
        .then(data => this.setState({appointments: data.events}));
      } else if (this.userName) {
        fetch('/api/calendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: this.state.range.startDate,
            to: this.state.range.endDate,
            username: this.userName,
          })
        }).then(response => response.json())
        .then(data => this.setState({appointments: data.events}));
      }
    }
        
    render() {
        const { appointments, currentDate } = this.state;
        return (
            <section className="calendar">
                {this.redirect && (<Navigate to="/signin"/>)}
                <h2 className="calendar_name">{this.gymId ? this.state.gymName : "Môj kalendár"}</h2>
                <Scheduler data={appointments}>                       
                    <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange}/>
                    <WeekView
                        timeScaleLabelComponent={this.TimeScaleLabel}
                        dayScaleCellComponent={this.DayScaleCell}
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments
                      appointmentComponent={this.CustomAppointment}
                      appointmentContentComponent={this.AppointmentContent}
                    />
                    <AppointmentTooltip
                        headerComponent={this.Header}
                        contentComponent={this.Content}
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