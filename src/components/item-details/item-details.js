import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './item-details.css';

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        loading: true
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updatePerson();
        }
    }

    updatePerson() {
        const { getData, itemId } = this.props;
        this.setState({
            loading: true
        })
        if (!itemId) {
            return;
        }

        console.log('dd', this.props);

        getData(itemId).then((item) => {
                console.log('it', item);
                this.setState({ 
                    item: item,
                    loading: false
                 });
            })
    }

    render() {
        const { item, loading } = this.state;
        const spinner = loading ? <Spinner /> : null;
        const content = !loading ? <ItemView item={item} /> : null;

        return (
            <div className="item-details card">
               {spinner}
               {content}
            </div>
        );

    }
};

const ItemView = ( {item }) => {
    if (!item) {
        return <span>Select a person from a list</span>
    }

    const { id, name, gender,
        birthYear, eyeColor } = item;
    return (
        <React.Fragment>
             <img className="item-image"
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="character"/>

                <div className="card-body">
                    <h4>{ name }</h4>
                    <ul className="list-group list-group-flush mb-4">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{ gender }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{ birthYear }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{ eyeColor }</span>
                        </li>
                    </ul>
                    <ErrorButton />
                </div>
        </React.Fragment>
    );
};