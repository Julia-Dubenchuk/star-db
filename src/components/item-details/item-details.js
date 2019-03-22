import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './item-details.css';

const Record = ({item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{ item[field] }</span>
        </li>
    );
};

export { Record };

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        loading: true,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
        }
    }

    updateItem() {
        const { getData, itemId, getImageUrl } = this.props;
        this.setState({
            loading: true
        })
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({ 
                    item: item,
                    loading: false,
                    image: getImageUrl(item)
                 });
            })
    }

    render() {
        const { item, loading, image } = this.state;
        const spinner = loading ? <Spinner /> : null;
        const content = !loading ? <ItemView item={item} image={image} 
        child={React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item });
        }) } /> : null;

        return (
            <div className="item-details card">
               {spinner}
               {content}
            </div>
        );

    }
};

const ItemView = ( { item, image, child }) => {
    if (!item) {
        return <span>Select a person from a list</span>
    }

    const { name } = item;
    return (
        <React.Fragment>
             <img className="item-image"
                    src={image} alt="character"/>

                <div className="card-body">
                    <h4>{ name }</h4>
                    <ul className="list-group list-group-flush mb-4">
                        {child}
                    </ul>
                    <ErrorButton />
                </div>
        </React.Fragment>
    );
};