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
                    <td>{data[i].price_type == "gold" ? null : data[i].price}</td>
                    <td>{data[i].price_type == "gold" ? data[i].price : null}</td>
                    <td>{data[i].level}</td>
                </tr>
            );
        }

        return (
            <table cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Warbucks</th>
                        <th>Gold</th>
                        <th>Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        );
    }
}
