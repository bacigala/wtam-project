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
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';
import  { Navigate } from 'react-router'
import moment from 'moment';
import 'moment/locale/sk'
import Content from "./appointment-tooltip/Content"
import Header from "./appointment-tooltip/Header"
import AppointmentContent from "./appointment/AppointmentContent"
import CustomAppointment from "./appointment/CustomAppointment"
import {formatDayScaleDate} from "../UtilityFunctions";

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
        console.log(this.cookies);
        if(this.cookies.userdata && this.cookies.userdata.user) {
          this.userId = this.cookies.userdata.user.id
          this.userName = this.cookies.userdata.user.username;
          this.name = this.cookies.userdata.user.name;
          this.surname = this.cookies.userdata.user.surname;
        } else if(this.props.user && !props.gymId) {
          this.redirect = true;
        }
        this.gymId = props.gymId;
        this.getGymName(this.gymId);
        this.updateInterval = 60000;
    }
  
    formatTimeScaleDate = date => moment(date).format('HH:mm');
    
    TimeScaleLabel = (
        { formatDate, ...restProps },
      ) => <WeekView.TimeScaleLabel {...restProps} formatDate={this.formatTimeScaleDate} />;
    
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
          formatDate={formatDayScaleDate}
          className={classes.dayScaleCell}
        />
    ));

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