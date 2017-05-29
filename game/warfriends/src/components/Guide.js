import React, { Component } from 'react';
import { Tabs, Tab } from './tm/tab';

import StrategyTab from './guide/StrategyTab';
import ArmyTab from './guide/ArmyTab';
import WeaponTab from './guide/WeaponTab';
import WarCardTab from './guide/WarCardTab';

export default class Guide extends Component {
    render() {
        return (
            <Tabs >
                <Tab title="Strategy"><StrategyTab /></Tab>
                <Tab title="Army"><ArmyTab /></Tab>
                <Tab title="Weapon"><WeaponTab /></Tab>
                <Tab title="WarCard"><WarCardTab /></Tab>
            </Tabs>
        );
    }
}