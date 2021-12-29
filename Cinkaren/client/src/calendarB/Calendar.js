import React from "react";
import "./Calendar.css";
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router';
import moment from 'moment';
import 'moment/locale/sk';
import {getTimeFromDateString, getDateFromDateString, getDayNameFromDateString} from "../UtilityFunctions";
import EventDetailsPopup from "./EventDetailsPopup";

class CalendarB extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      gymName: "",
      appointments: [],
      currentDate: new Date(moment()),
      range: this.getRange(new Date(moment()), window.innerWidth < 769),
      showDetailsOfEvent: null
    };
    this.cookies = new Cookies();
    this.cookies = this.cookies.getAll();
    if (this.cookies.userdata && this.cookies.userdata.user) {
      this.userId = this.cookies.userdata.user.id
      this.userName = this.cookies.userdata.user.username;
      this.name = this.cookies.userdata.user.name;
      this.surname = this.cookies.userdata.user.surname;
    } else if (this.props.user && !props.gymId) {
      this.redirect = true;
    }
    this.gymId = props.gymId;
    this.getGymName(this.gymId);
    this.updateInterval = 60000;
  }
  
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

  getRange = (date, small = this.state.windowWidth < 769) => {
    if (small) {
      let startDate = new Date(date);
      startDate.setHours(0,0,0,0);
      let endDate = new Date(date);
      endDate.setHours(23,59,59,59);
      return {
        startDate: startDate,
        endDate: endDate
      };
    }

    let firstDay = date.getDate() - date.getDay();
    let lastDay = firstDay + 6;
    console.log(date);
    firstDay = new Date(date.setDate(firstDay));
    firstDay.setHours(0,0,0,0);
    lastDay = new Date(date.setDate(lastDay));
    lastDay.setHours(23,59,59,59);
    return {
      startDate: firstDay,
      endDate: lastDay
    };
  };

  currentDateChange = currentDate => {
    let range = this.getRange(currentDate);
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

  showDetailsPopup = (event) => {
    this.setState({
      showDetailsOfEvent: event
    });
  }

  render() {
    const { windowWidth, appointments, currentDate } = this.state;
    return (
      <section className="calendarB">
        { this.redirect && (<Navigate to="/signin"/>) }
        { (this.state.showDetailsOfEvent !== null) && (
              <EventDetailsPopup 
                  appointmentData={this.state.showDetailsOfEvent}
                  close={this.showDetailsPopup.bind(null, null)}
                  refresh={this.componentDidMount.bind(this)}
              />
            )
        }
        <h1 className="calendar_name">{this.gymId ? this.state.gymName : "Môj kalendár B"}</h1>
        <div className="events">
        { appointments.map(event => {
          return(
              <article className="event">
                <h1>{event.name}</h1>
                <div className="event-body">
                  <div className="details">
                    <div className="detail">
                      <h1>Deň</h1>
                      <p>{getDateFromDateString(event.startDate) + " (" + getDayNameFromDateString(getDateFromDateString(event.startDate, "en")) + ")"}</p>
                    </div>
                    <div className="detail">
                      <h1>Od</h1>
                      <p>{getTimeFromDateString(event.startDate)}</p>
                    </div>
                    <div className="detail">
                      <h1>Do</h1>
                      <p>{getTimeFromDateString(event.endDate)}</p>
                    </div>
                    <div className="detail">
                      <h1>Tréner</h1>
                      <p>{event.trainer_name + " " + event.trainer_surname}</p>
                    </div>
                  </div>
                  <div className="options">
                    <button onClick={this.showDetailsPopup.bind(null, event)} className="option">Detaily</button>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </article>
            );
        })}
        </div>
      </section>
    );
  }
}

export default CalendarB;