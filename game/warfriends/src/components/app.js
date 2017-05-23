import React, { Component } from 'react';
import { Tabs, Tab } from './tm/tab';

import StatsTable from './StatsTable';
import StatsData from '../data/stats';

import PlayerTable from './PlayerTable';
import PlayerData from '../data/player';

import QuestTable from './QuestTable';
import QuestData from '../data/quest';

import Guide from './Guide';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.loopFn = this.loopFn.bind(this);
  }

  loopFn(data, key) {
    var result = null;
    var firstEntry = data[Object.keys(data)[0]];
    if (firstEntry.level == null || firstEntry.level == undefined) {
      var children = [];
      for (var i in data) {
        children.push(
          <Tab key={i} title={i}>{this.loopFn(data[i], i)}</Tab>
        );
      }
      result = (
        <Tabs key={key}>{children}</Tabs>
      );
    } else {
      result = (
        <Tab key={key} title={key}><StatsTable data={data} /></Tab>
      );
    }

    return result;
  }

  render() {
    let statsTab = this.loopFn(StatsData, "app");
    let playerTab = (<PlayerTable data={PlayerData} />);
    let questTab = (<QuestTable data={QuestData} />);
    let guideTab = (<Guide />);

    return (
      <div>
        <div className="header">
          <img src="image/favicon.png" />
          Warfriends by Chillingo
        </div>
        <Tabs>
          <Tab title="Stats">{statsTab}</Tab>
          <Tab title="Player">{playerTab}</Tab>
          <Tab title="Quest">{questTab}</Tab>
          <Tab title="Guide">{guideTab}</Tab>
        </Tabs>
      </div>
    );
  }
}
