import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';

import './app.css';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import ItemDetails from '../item-details';

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

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        const { getPerson, getStarship } = this.swapiService;

        const personDetails = (
            <ItemDetails 
                itemId={11}
                getData={getPerson} />
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship} />
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