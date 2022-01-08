import React from "react";
import profile from "../../assets/No_Image.jpg";
import Cookies from 'universal-cookie';
import {getTimeFromDateString, getDayFromDateString, getDateFromDateString} from "../../UtilityFunctions";

class Content extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          id: this.props.appointmentData.id,
          gym_name: this.props.appointmentData.gym_name,
          plan: this.props.appointmentData.plan,
          users: this.props.appointmentData.users,
          max_participants: this.props.appointmentData.max_participants,
          trainer_name: this.props.appointmentData.trainer_name,  
          trainer_surname: this.props.appointmentData.trainer_surname, 
          startDate: this.props.appointmentData.startDate,
          endDate: this.props.appointmentData.endDate,
          triedToSign: false
        };
        this.cookies = new Cookies();
        this.cookies = this.cookies.getAll();
        if(this.cookies.userdata && this.cookies.userdata.user) {
          this.userId = this.cookies.userdata.user.id
          this.userName = this.cookies.userdata.user.username;
          this.name = this.cookies.userdata.user.name;
          this.surname = this.cookies.userdata.user.surname;
        }
    }

    getTrainingButton(eventId, users, full) {
        if(full){
          return (<p className="sign full">Plné!</p>)
        } else if(users.some(user => user.id == this.userId)) {
          return (
            <button className="sign" type="submit" onClick={() => {this.signIntoTraining('/api/event/signout', eventId, users, true) }}>Odhlásiť</button>
          );
        } else {
          return (
            <button className="sign" type="submit" onClick={() => {this.signIntoTraining('/api/event/signin', eventId, users, false) }}>Prihlásiť</button>
          );
        }
    }

    signIntoTraining = (path, eventId, users, remove) => {
        if(this.userId){
          if(remove){
            let index = -1;
            for(let i = 0; i < users.length; i++){
              if(this.userId == users[i].id){
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
          this.setState({users: users});
        } else {
          this.setState({triedToSign: true});
        }
    };

    render(){
        return (
            <div className="popup">
                <div className="plan">
                  <p className="titleOfList">Tréningový plán</p>
                  <ul className="list">
                      {this.state.plan.map(e => <li>{e}</li>)}
                  </ul>
                </div>
                <div className="attendees">
                <div>
                    <p className="titleOfList">Prihlásení</p>
                    <p className="numOfAttendees">{this.state.users.length}/{this.state.max_participants}</p>
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
                <div className="details">
                  <p className="day">{getDayFromDateString(this.state.startDate, true)}</p>
                  <p className="date">{getDateFromDateString(this.state.startDate)}</p>
                  <p className="from">{getTimeFromDateString(this.state.startDate)} - { getTimeFromDateString(this.state.endDate)}</p>
                  <p className="gymName">{this.state.gym_name}</p>
                  {this.getTrainingButton(this.state.id, this.state.users, this.state.users.length >= this.state.max_participants)}
                </div>
                {this.state.triedToSign ? <p className="appointmentError">Musíte byť prihlásený aby ste sa mohli prihlásiť na tréning</p> : null}
            </div>
        );
    }
}

export default Content;