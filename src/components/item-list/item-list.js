import React, { Component } from 'react';

import './item-list.css';
import { withData } from '../hoc-helper';
import SwapiService from '../../services/swapi-service';

const ItemList = (props) => {

    const { data } = props;


    const items = data.map((item) => {
            const { id, onItemSelected, children: renderLabel } = item;
            const label = renderLabel(item);
            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        });

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}



const { getAllPeople } = new SwapiService();

export default withData(ItemList, getAllPeople );