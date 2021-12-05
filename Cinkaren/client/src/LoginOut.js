import React, { useState } from 'react';
import "./LoginOut.css";
import Cookies from 'universal-cookie';
import { sha256} from 'js-sha256';

class LoginOut extends React.Component {
    
    constructor(props) {
        super(props);
        this.location = window.location.href;
        this.state = { username: '', password: '' };
        this.loggedIn = false;
        this.cookies = new Cookies();
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
     };


    clickLogin = (e) => {
        e.preventDefault();
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
            console.log(result);
            this.cookies.set('userdata', result, {path: '/'});
            console.log(this.cookies.getAll());
        });
      }



    createAccountBtn() {
    return (
        <a href="/signup">
            <button className="createAccount" required>Vytvoriť účet</button>
        </a>
    );
    }  

    login() {
        return (
                <form className="loginwrapper">
                <h3>
                    Prihlásenie
                </h3>
                <p><b>
                    Meno:
                </b></p>
                <p>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}>

                    </input>
                </p>
                <p><b>
                    Heslo:
                </b></p>
                <p>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange}>

                    </input>
                </p>
                <p>
                    <button className="login" type="submit" onClick={this.clickLogin} required>Prihlásiť sa</button>
                </p>
                </form>
                
        );
    }



    render () {
        
        return (
        <section className="loginout">
            <div className="modal">
                {this.login()}
                {this.createAccountBtn()}   
            </div>
        </section>
        );
    }
}

export default LoginOut;