import React from "react";
import "./MainPage.css";
import { Navigate } from 'react-router';
import Cookies from 'universal-cookie';

class MainPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.location = window.location.href;
        this.loggedIn = false;
        this.cookies = new Cookies();
    }

    createAccountBtn() {
        if (this.cookies.get("userdata") !== undefined) { 
        } else {
        return (
            <a href="/signup">
                    <button className="big-button">Registrácia</button>
            </a>
        );
        }
    }  

    render() {
      return (
        <section id="main-page">
            <div class="wellcome">
                <h1>Vitaj makač!</h1>
                <p>Kým Ty si tu pobehuješ po webe,</p>
                <p>v gymoch na sebe pracuje 1453 ľudí na 93 práve prebiehajúcich tréningoch.</p>
                <p>Pridaj sa k nim:</p>

                {this.createAccountBtn()}

                <a href="/search">
                    <button className="big-button">Nájsť gym</button>
                </a>
            </div>
        </section>
        );
    }
}

export default MainPage;