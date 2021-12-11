import React from "react";
import "./GymSearch.css";

class GymSearch extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {gyms: [], address: ""};
    }

    handleChange = ({ target }) => {
        this.setState({ address: target.value });
    };

    filter(){
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
            <form>
                <input type="text" mesto="address" value={this.state.address} onChange={this.handleChange}/>
                <button className="filtruj" type="submit" onClick={this.filter} required>Filtruj</button>
            </form>
        );
    }

    render() {
      return (
        <section className="main">
                <h2>Vyhľadávanie gymov</h2>
                {this.filter()}
                <div className="listWrapper">
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