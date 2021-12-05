import React, { useState } from 'react';
import "./SingUp.css";
import { sha256} from 'js-sha256';
import Cookies from 'universal-cookie';

class SingUp extends React.Component {
    
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


    signup () {
        return (
            <form className="loginwrapper">
                <h3>
                    Registrácia
                </h3>
                <p><b>
                    Zadajte meno:
                </b></p>
                <p>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}>
                    </input>
                </p>
                <p><b>
                    Zadajte heslo:
                </b></p>
                <p>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange}>
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
             "name":"Martin",
             "surname":"Userovič"
          }),
      })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            this.cookies.set('wasCreated', result.success, {path: '/'});
            this.cookies.set('username', this.state.username, {path: '/'});
            console.log(this.cookies.getAll());
        });
      }



render() {
    return (
    <section className="signup">
        <div className="signupmodal">
        {this.signup()}
        {this.createLoginBtn()} 
        </div>
    </section>
    );
}

}

export default SingUp;