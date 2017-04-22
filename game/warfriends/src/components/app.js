import React, { Component } from 'react';
import { Tabs, Tab } from './tm/tab';
import Table from './table';
import WarfriendsData from '../data/data';

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
        <Tab key={key} title={key}><Table data={data} /></Tab>
      );
    }
    
    return result;
  }

  render() {
    return (
      <div>
        <div>Warfriends by Chillingo</div>
        {this.loopFn(WarfriendsData, "app")}
      </div>
    );
  }
}
