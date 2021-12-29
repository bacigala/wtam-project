
//
// popup that shows up after click on "details" button in event list
// shows training plan, attendees, trainer, allows user to join the training etc.
// based on ../calendar/appoinment-tooltip/Content.js
//

import React from "react";
import profile from "../assets/No_Image.jpg";
import Cookies from 'universal-cookie';
import {getTimeFromDateString, getDayFromDateString, getDateFromDateString} from "../UtilityFunctions";

class EventDetailsPopup extends React.Component {
    
  constructor(props) {
    
    // get training info passed to copmonent as properties
    super(props);
    this.state = {
      id: this.props.appointmentData.id,
      name: this.props.appointmentData.name,
      gym_name: this.props.appointmentData.gym_name,
      plan: this.props.appointmentData.plan,
      users: this.props.appointmentData.users,
      max_participants: this.props.appointmentData.max_participants,
      trainer_name: this.props.appointmentData.trainer_name,  
      trainer_surname: this.props.appointmentData.trainer_surname, 
      startDate: this.props.appointmentData.startDate,
      endDate: this.props.appointmentData.endDate,
      close: this.props.close,
      refreshParent: this.props.refresh
    };

    // get logged-in user info from cookies
    this.cookies = new Cookies();
    this.cookies = this.cookies.getAll();
    if (this.cookies.userdata && this.cookies.userdata.user) {
      this.userId = this.cookies.userdata.user.id
      this.userName = this.cookies.userdata.user.username;
      this.name = this.cookies.userdata.user.name;
      this.surname = this.cookies.userdata.user.surname;
    }
  }

  signIntoTraining = (path, eventId, users, remove) => {
    
    // user has to be logged-in to sing-in to training
    if (!this.userId)
      return;
      
    // update local structures
    if (remove) {
      let index = -1;
      for (let i = 0; i < users.length; i++) {
        if (this.userId == users[i].id) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        users.splice(index, 1);
      }
    } else {
      users.push({id: this.userId, name: this.name, surname: this.surname});
    }
    
    // update server (DB)
    fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.userId,
        eventId: eventId,
      })
    });
    
    this.state.refreshParent();
    this.setState({users: users});
  };

  getTrainingButton(eventId, users, full) {
    if (full) {
      return (
        <p className="sign full">Plné!</p>
      )
    }
    
    if (users.some(user => user.id == this.userId)) {
      return (
        <button className="sign" type="submit" onClick={() => {this.signIntoTraining('/api/event/signout', eventId, users, true) }}>Odhlásiť</button>
      );
    } 
    
    return (
      <button className="sign" type="submit" onClick={() => {this.signIntoTraining('/api/event/signin', eventId, users, false) }}>Prihlásiť</button>
    );
  }

  render(){
    return (
      <div className="popupB">
        <svg className="closeIcon" focusable="true" viewBox="0 0 24 24" aria-hidden="true" onClick={this.state.close}>
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>

        <h2 className="titleB" onClick={this.state.close}>{this.state.name}</h2>
        <div className="plan">
          <p className="titleOfList">Tréningový plán</p>
          <ul className="list">
            {this.state.plan.map(e => <li>{e}</li>)}
          </ul>
        </div>
        <div className="entered">
          <div>
            <p className="titleOfList">Prihlásení</p>
            <p className="numOfEntered">{this.state.users.length}/{this.state.max_participants}</p>
          </div>
          <ul className="list">
              {this.state.users.map(e => <li>{e.name + " " + e.surname}</li>)}
          </ul>
        </div>
        <div className="trainer">
          <div className="imageWrapper">
            <img src={profile} width="150" height="115"/>
          </div>
          <p>{this.state.trainer_name + " " + this.state.trainer_surname}</p>
          <a href="/profile"><button>Profil</button></a>
        </div>
        <p className="day">{getDayFromDateString(this.state.startDate, true)}</p>
        <p className="date">Dátum: {getDateFromDateString(this.state.startDate)}</p>
        <p className="from">Od: {getTimeFromDateString(this.state.startDate)}</p>
        <p className="to">Do: { getTimeFromDateString(this.state.endDate)}</p>
        {this.getTrainingButton(this.state.id, this.state.users, this.state.users.length >= this.state.max_participants)}
      </div>
    );
  }
}

export default EventDetailsPopup;