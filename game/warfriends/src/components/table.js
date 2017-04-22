import React, { Component } from 'react';
import _ from 'lodash';

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;

        var children = [];
        for (var i in data) {
            children.push(
                <tr key={i}>
                    <td>{i}</td>
                    <td>{data[i].price}</td>
                    <td>{data[i].price_type}</td>
                    <td>{data[i].level}</td>
                </tr>
            );
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Price type</th>
                        <th>Level</th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        );
    }
}
