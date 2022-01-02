import React from "react";
import ReactDOM from 'react-dom';
import "./Calendar.css";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
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
import {
  formatDayScaleDate, 
  getHoursFromDateString,
  getWeekNumberFromDate, 
  getYearFromDate,
  getBegginingOfWeek,
  getEndOfWeek
} from "../UtilityFunctions";
import { RouteChildrenProps } from "react-router-dom";

class Calendar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            gymName: "",
            appointments: [],
            currentDate: new Date(moment()),
            range: this.getRange(new Date(moment()), window.innerWidth < 769)
        };
        this.cookies = new Cookies();
        this.cookies = this.cookies.getAll();
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

    handleResize = (e) => {
      this.setState({ windowWidth: window.innerWidth });
    };
  
    formatTimeScaleDate = date => moment(date).format('HH:mm');
    
    TimeScaleLabelForDay = (
        { formatDate, ...restProps },
      ) => <DayView.TimeScaleLabel {...restProps} formatDate={this.formatTimeScaleDate} />;

    TimeScaleLabelForWeek = (
        { formatDate, ...restProps },
      ) => <WeekView.TimeScaleLabel {...restProps} formatDate={this.formatTimeScaleDate} />;
    
    styles = {
        dayScaleCell: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      };
    
    DayScaleCellForDay = withStyles(this.styles, 'DayScaleCell')((
        { formatDate, classes, ...restProps },
      ) => (
        <DayView.DayScaleCell
          {...restProps}
          formatDate={formatDayScaleDate}
          className={classes.dayScaleCell}
        />
    ));

    DayScaleCellForWeek = withStyles(this.styles, 'DayScaleCell')((
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

    getRange = (date, small) => {
      if (small) {
        let startDate = new Date(date);
        startDate.setHours(0,0,0,0);
        let endDate = new Date(date);
        endDate.setHours(23,59,59,59);
        return { startDate: startDate, endDate: endDate };
      } else {
        let firstDay = getBegginingOfWeek(date);
        let lastDay = getEndOfWeek(date);
        firstDay.setHours(0,0,0,0);
        lastDay.setHours(23,59,59,59);
        return {
          startDate: firstDay,
          endDate: lastDay
        };
      }
    };

    currentDateChange = currentDate => {
      let range = this.getRange(currentDate, this.state.windowWidth < 769);
      this.setState({
        currentDate,
        range
      }, this.componentDidMount);
    };

    setScrollbarOffset() {
      let time = 25;
      for(const appointment of this.state.appointments) {
        if(time > getHoursFromDateString(appointment.startDate)){
          time = getHoursFromDateString(appointment.startDate);
        }
      }
      let elements = document.querySelectorAll("#root > div > section > div > div");
      if(time < 25){
        elements[1].scrollTo(0, (time * 2 * 48) - 10);
      } else {
        elements[1].scrollTo(0, (moment().hours() * 2 * 48) - 10);
      }
    }

    componentDidMount() {
      window.addEventListener("resize", this.handleResize);
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
        .then(data => this.setState({appointments: data.events}, this.setScrollbarOffset));
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
        .then(data => this.setState({appointments: data.events}, this.setScrollbarOffset));
      }
    }

    componentWillUnmount() {
      window.addEventListener("resize", this.handleResize);
    }

    getView(small) {
      if(small) {
        return (
          <DayView
            timeScaleLabelComponent={this.TimeScaleLabelForDay}
            dayScaleCellComponent={this.DayScaleCellForDay}
          /> 
        ); 
      } else { 
        return (
          <WeekView
            timeScaleLabelComponent={this.TimeScaleLabelForWeek}
            dayScaleCellComponent={this.DayScaleCellForWeek}
          /> 
        );
      }
    }
        
    render() {
        const { windowWidth, appointments, currentDate } = this.state;
        return (
            <section className="calendar">
                {this.redirect && (<Navigate to="/signin"/>)}
                <h2 className="calendar_name">{this.gymId ? this.state.gymName : "Môj kalendár"}</h2>
                <Scheduler data={appointments}>                       
                    <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange}/>
                    {this.getView(windowWidth < 769)} 
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