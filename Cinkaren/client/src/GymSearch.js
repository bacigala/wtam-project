import React from "react";
import "./GymSearch.css";

class GymSearch extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {gyms: []};
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

    render() {
        console.log(this.state);
      return (
        <section className="main">
                <h2>Vyhľadávanie gymov</h2>
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