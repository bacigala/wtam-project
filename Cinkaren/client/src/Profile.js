import React from "react";
import profile from "./assets/No_Image.jpg";
import Cookies from 'universal-cookie';
import "./Profile.css";
import infoIcon from "./assets/info_icon.svg"

class Profile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {achievments: []};
        this.cookies = new Cookies();
        this.cookies = this.cookies.getAll();
        console.log(this.cookies);
        if(this.cookies.userdata && this.cookies.userdata.user) {
          this.userId = this.cookies.userdata.user.id
          this.userName = this.cookies.userdata.user.username;
          this.name = this.cookies.userdata.user.name;
          this.surname = this.cookies.userdata.user.surname;
          this.email = this.cookies.userdata.user.email;
          this.birth_date = this.cookies.userdata.user.birth_date;
          this.getAchievments();
          //console.log(this.state.achievments);
        }
        
    }


    getAchievments() {
        fetch('/api/achievement/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: this.userId
          })
        }).then(response => response.json())
        .then(data =>this.state.achievments=data.achievements);
        console.log(this.state.achievments);
        
      };
      //{this.setState({achievments: data.achievments})}
//{this.state.achievments.map(e => <li>{e}</li>)}
    render() {
      return (
        <section className="mainProfile">
            <div className="popupProfile">
                <h3 className="titleOfProfile">Profil</h3>
                <div className="achievments">
                    <p className="titleOfAchievements">Úspechy</p>
                    <ul className="profileList">

                    </ul>
                </div>
                <div className="history">
                    <div>
                        <p className="titleOfAchievements">História tréningov</p>
                    </div>
                    <ul className="profileList">

                    </ul>
                </div>
                <div className="profile">
                    <div className="imageWrapperProfile">
                        <img src={profile} width="150" height="115"/>
                    </div>
                </div>
                <p className="profileUserName">Prezívka: {this.userName}</p>
                <p className="profileNname">Meno: {this.name}</p>
                <p className="profileSurname">Priezvisko: {this.surname}</p>
            </div>
                
        </section>
      );
    }
}

export default Profile;