import React, { Component } from 'react';
import _ from 'lodash';

export default class PlayerTable extends Component {
    constructor(props) {
        super(props);

        let original_data = props.data;

        let data = [];
        for (let i in original_data) {
            for (let j in original_data[i]) {
                data.push({
                    name: original_data[i][j],
                    type: i
                });
            }
        }

        this.state = {
            data: data,
            keyword: ""
        }

        this.onKeyworkChange = this.onKeyworkChange.bind(this);
    }

    onKeyworkChange(event) {
        this.setState({
            keyword: event.target.value
        });
    }

    render() {
        let data = this.state.data;
        let keyword = this.state.keyword.toLowerCase();

        let players = [];
        for (let i in data) {
            let name = data[i].name.toLowerCase();
            let type = data[i].type;
            if (keyword == "" || name.includes(keyword)) {
                players.push(
                    <div key={i} className="PlayerTableEntry">
                        <div className="PlayerTableEntryType">{type}</div>
                        <div className="PlayerTableEntryName">{data[i].name}</div>
                    </div>
                );
            }
        }

        return (
            <div>
                <div>
                    <input type="text" placeholder="player name" onChange={this.onKeyworkChange} value={this.state.keyword} />
                </div>
                <div className="PlayerTable">
                    {players}
                </div>
            </div>
        );
    }
}
