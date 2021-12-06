import React from "react";
import "./MainPage.css";

class MainPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.location = window.location.href;
        this.loggedIn = false;
    }

    render() {
      return (
        <section id="main-page">
            <div class="wellcome">
                <h1>Vitaj makáč!</h1>
                <p>Kým Ty si tu pobehuješ po webe,</p>
                <p>v gymoch na sebe pracuje 1453 ľudí na 93 práve prebiehajúcich tréningoch.</p>
                <p>Pridaj sa k nim:</p>

                <a href="/search">
                    <button className="big-button">Nájsť gym</button>
                </a>

                <a href="/signup">
                    <button className="big-button">Registrácia</button>
                </a>
            </div>
        </section>
        );
    }
}

export default MainPage;