import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';

import Row from '../row';
import ItemDetails, { Record } from '../item-details';
import SwapiService from '../../services/swapi-service';

import './app.css';

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

  

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {

        // if (this.state.hasError) {
        //     return <ErrorIndicator />
        // }

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        const { getPerson, 
                getStarship,
                getPersonImage,
                getStarshipImage } = this.swapiService;

        const personDetails = (
            <ItemDetails 
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage} >
                <Record field="gender" label="Gender" />
                <Record field="" label="Eye Color" />
                </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}
                >
                   
                </ItemDetails>
        );

        return (
            <ErrorBoundry>
                <div className="container col-lg-10">
                    <Header />
                    {/* { planet }

                    <button
                        className="toggle-planet btn btn-warning btn-lg mb-4"
                        onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <ErrorButton /> */}

                    {/* <PeoplePage /> */}
                    <Row
                        left={personDetails}
                        right={starshipDetails} />
                </div>
            </ErrorBoundry>
        );
    }
};