import React from "react";
import "./GymSearch.css";
import infoIcon from "./assets/info_icon.svg"

class GymSearch extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {gyms: [], address: "", showInfo: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    }

    handleChange = ({ target }) => {
        this.setState({ address: target.value });
    };

    handleFilterSubmit(event) {
        event.preventDefault();
        fetch('/api/gym/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: this.state.address,
            })
          }).then(response => response.json())
          .then(data => {this.setState({gyms: data.gyms})});
    }

    componentDidMount() {
          fetch('/api/gym/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
          }).then(response => response.json())
          .then(data => this.setState({gyms: data.gyms}));
    }

    filter() {
        return (
            <form className="gymSearchForm">
                <div className="gymSearchTooltip">
                    <img src={infoIcon} width="30px" height="30px"/>
                    <span className="gymSearchTooltipText">Do políčka zadajte celú alebo čast adresy. Napríklad na vyhladanie 'Bratislava' funguje hociaka podčasť slova, teda aj 'Brat'</span>
                </div>
                <label for="gymSearchAddress" className="gymSearchAddress">Adresa</label>
                <input className="gymSearchAddressInput" id="gymSearchAddress"type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                <button className="filtruj" type="submit" onClick={this.handleFilterSubmit}>Filtruj</button>
            </form>
        );
    }

    render() {
      return (
        <section className="main">
                <h2>Vyhľadávanie gymov</h2>
                <div className="listWrapper">
                    {this.filter()}
                    <ul className="gymList">
                        {this.state.gyms.map(gym => {
                            return(
                                <a href={"/calendar/" + gym.id}>
                                    <li className="listOfGyms">
                                        <div className="info">
                                            <h3 className="info-gym-name">{gym.name}</h3>
                                            <ul className="additionalInfo">
                                                <li>Adresa: {gym.address}</li>
                                                <li>Email: {gym.email}</li>
                                                <li>Mobil: {gym.phone}</li>
                                            </ul>
                                        </div>
                                    </li>
                                </a>);
                        })}
                    </ul>
                </div>
        </section>
      );
    }
}

export default GymSearch;