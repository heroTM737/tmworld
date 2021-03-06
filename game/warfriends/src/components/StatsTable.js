import React, { Component } from 'react';
import _ from 'lodash';

function formatCurrency(n) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").split(".")[0];
}

const Image = ({src, fallbackSrc, ...other}) => {
    let element;
    const changeSrc = newSrc => {
        element.src = newSrc;
    };
    return (
        <img src={src}
            onError={() => changeSrc(fallbackSrc)}
            ref={el => element = el}
            {...other} />
    );
};

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;
        var firstEntry = data[Object.keys(data)[0]];
        var isArmy = firstEntry.min_health != undefined && firstEntry.min_health != null;

        var children = [];
        for (var i in data) {
            var price = formatCurrency(data[i].price);
            children.push(
                <tr key={i}>
                    <td>
                        <Image src={"image/" + (isArmy ? "army" : "weapon") + "/" + i + ".png"} fallbackSrc="image/favicon.png" />
                    </td>
                    <td>{i}</td>
                    <td>{data[i].price_type == "gold" ? null : price}</td>
                    <td>{data[i].price_type == "gold" ? price : null}</td>
                    <td>{data[i].level}</td>
                    <td>{data[i].min_damage}</td>
                    <td>{data[i].max_damage}</td>
                    <td>{data[i].accuracy}</td>
                    <td>{data[i].rate_of_fire}</td>
                    <td>{data[i].shot_speed}</td>
                    {isArmy ? <td>{data[i].min_health}</td> : null}
                    {isArmy ? <td>{data[i].max_health}</td> : null}
                    {isArmy ? <td>{data[i].deploy_cost}</td> : null}
                    {isArmy ? <td>{data[i].deploy_cooldown}</td> : null}
                    {isArmy ? <td>{data[i].move_speed}</td> : null}
                </tr>
            );
        }

        return (
            <table cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Warbucks</th>
                        <th>Gold</th>
                        <th>Rank</th>
                        <th>Min Damage</th>
                        <th>Max Damage</th>
                        <th>Accuracy (%)</th>
                        <th>Rate of fire (/m)</th>
                        <th>Shot speed</th>
                        {isArmy ? <th>Min Health</th> : null}
                        {isArmy ? <th>Max Health</th> : null}
                        {isArmy ? <th>Deploy Cost</th> : null}
                        {isArmy ? <th>Deploy Cooldown</th> : null}
                        {isArmy ? <th>Move Speed</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        );
    }
}
