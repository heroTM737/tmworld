import React, { Component } from 'react';
import _ from 'lodash';

export default class QuestTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
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

        let quests = [];
        for (let i in data) {
            let name = data[i].name.toLowerCase();
            if (keyword == "" || name.includes(keyword)) {
                quests.push(
                    <tr key={i}>
                        <td>{data[i].name}</td>
                        <td>{data[i].mission}</td>
                        <td>{data[i].count}</td>
                    </tr>
                );
            }

        }

        return (
            <div>
                <div>
                    <input type="text" placeholder="quest name" onChange={this.onKeyworkChange} value={this.state.keyword} />
                </div>
                <div>
                    <table cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mission</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quests}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
