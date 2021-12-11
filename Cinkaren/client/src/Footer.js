import React from "react";
import logo from "./assets/logo.svg";
import "./Footer.css";

class Footer extends React.Component {
    
    constructor(props) {
        super(props);
        this.location = window.location.href;
    }

    render() {
        return (
            <footer>
                <div className="sub-footer">
                    <h1>Projekt Činkáreň</h1>
                    <ul>
                        <li><a href="https://github.com/bacigala/wtam-project" target="_blank">Zdroják na Githube</a></li>
                        <li><a href="https://davinci.fmph.uniba.sk/~stolarik6/wtam/specification.pdf" target="_blank">Špecifikácia</a></li>
                        <li><a href="https://github.com/bacigala/wtam-project/issues" target="_blank">Nahlásiť problém</a></li>
                    </ul>
                </div>
                <div className="sub-footer" id="footer-logo">
                    <a href="/" className="vertical-center">
                        <img src={logo} alt="cinkaren_logo"  width="150" height="100"/>
                    </a>
                </div>
                <div className="sub-footer">
                    <h1>Pridaj sa k nám</h1>
                    <ul>
                        <li><a>Poď cvičiť</a></li>
                        <li><a>Porzvi kamarátov</a></li>
                        <li><a>Zverejni svoj gym</a></li>
                    </ul>
                </div>
            </footer>
        );
    }
}

export default Footer;