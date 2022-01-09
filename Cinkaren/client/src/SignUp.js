import React, { useState } from 'react';
import "./SingUp.css";
import { sha256} from 'js-sha256';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

class SingUp extends React.Component {
    
    constructor(props) {
        super(props);
        this.location = window.location.href;
        this.state = { username: '', password: '', email: '', meno: '', priezvisko: '', errorMessage:''};
        this.loggedIn = false;
        this.cookies = new Cookies();
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };


    signup () {
        return (
            <form className="loginwrapper" autocomplete="off">
                <h3>
                    Registrácia
                </h3>

                <p><b>
                    Zadajte Vaše meno
                </b></p>
                <p>
                    <input type="text" name="meno" value={this.state.meno} onChange={this.handleChange} required>
                    </input>
                </p> 

                <p><b>
                    Zadajte Vaše priezvisko
                </b></p>
                <p>
                    <input type="text" name="priezvisko" value={this.state.priezvisko} onChange={this.handleChange} required>
                    </input>
                </p>

                <p><b>
                    Zadajte užívateľské meno
                </b></p>
                <p>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required>
                    </input>
                </p>

                <p><b>
                    Zadajte heslo
                </b></p>
                <p>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required>
                    </input>
                </p>

                <p>
                    <button className="login" type="submit" onClick={this.clickRegister}>Zaregistrovať sa</button>
                </p>
            </form>
        );
    }

    createLoginBtn() {
        return (
            <a href="/signin">  
                <button className="loginBtn" required>Prihlásiť sa</button>
            </a>
        );
    }
    
    clickRegister = (e) => {
        e.preventDefault();
        fetch ('/api/user/insert', {
           method: 'POST',
           headers: { 
            'Content-Type': 'application/json'
            },
           body: JSON.stringify({
             username: this.state.username,  
             password: sha256(this.state.password),
             name: this.state.meno,
             surname: this.state.priezvisko
          }),
      })
        .then((response) => response.json())
        .then((result) => {
            this.cookies.set('wasCreated', result.success, {path: '/'});
            this.cookies.set('username', this.state.username, {path: '/'});
            if (result.success === false) {
                if (this.state.meno.trim()==='') {
                    this.setState({ errorMessage: "Zadajte meno" });
                } else if(this.state.priezvisko.trim()==='') {
                    this.setState({ errorMessage: "Zadajte priezvisko" });
                } else if(this.state.username.trim()==='') { 
                    this.setState({ errorMessage: "Zadajte užívateľské meno" });
                } else if(this.state.password.trim()==='') { 
                    this.setState({ errorMessage: "Zadajte heslo" });
                } else {
                this.setState({ errorMessage: result.message });
                }
            } else {
                fetch ('/api/user/verify', {
                    method: 'POST',
                    headers: { 
                     'Content-Type': 'application/json'
                     },
                    body: JSON.stringify({
                      username: this.state.username,  
                      password: sha256(this.state.password)
                   }),
               })
                 .then((response) => response.json())
                 .then((result) => {
                     if(result.user){
                        setTimeout(() => {
                            this.cookies.set('userdata', result, {path: '/'});
                            this.setState({result: true});
                            window.location.reload(false);
                        }, 10);
                     }
                 });
            }
        });        
    }


render() {
    return (
    <section className="signup">
        <div className="signupmodal">
        {this.cookies.get("userdata") && (<Navigate to="/"/>)}
        {this.signup()}
        {this.createLoginBtn()} 
        {<h4 className="error"> { this.state.errorMessage } </h4>}
        </div>
    </section>
    );
}

}

export default SingUp;