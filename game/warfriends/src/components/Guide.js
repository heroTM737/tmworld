import React, { Component } from 'react';

export default class Guide extends Component {
    render() {
        return (
            <div className="box-list">
                <div className="box">
                    <div className="box-header"><span className="box-title">Strategies</span></div>
                    <div className="box-body">
                        <div><b>Max soldier</b></div>
                        <div>
                            <ul>
                                <li>defender: infantry, engineer</li>
                                <li>rusher: swap, comando, flamethrower, warper</li>
                                <li>shooter: sniper</li>
                                <li>explosive: grenader, jetpack, rhino</li>
                            </ul>
                            <div>Heart of this strategy: infantry</div>
                            <div>Army upgrade order:</div>
                            <ul>
                                <li>max out infrantry level and ability</li>
                                <li>max out engineer level and ability</li>
                                <li>you can choose between rusher or explosive, any unit that fit your style and money </li>
                                <li>dont upgrade your shooter unit</li>
                            </ul>
                            <div>How to play</div>
                            <ul>
                                <li>spam as many solider as possible, spam priority follows upgrade order</li>
                                <li>try to clear enemy army asap</li>
                                <li>
                                    wait till your attack unit comes out(rusher or explosive) <br/>
                                    => your enemy is forced to get out of cover to shoot your army <br/>
                                    => it's your chance to hit him/her with your weapon
                                </li>
                                <li>
                                    if your enemy still survives when time expires <br/>
                                    => he/she will soon out of gun bullets <br/>
                                    => time to end your fight and gain glory
                                </li>
                            </ul>
                            <div>Typical play:</div>
                        </div>
                        <div><b>Max vehicle</b></div>
                        <div>
                            <ul>
                                <li>defender: orca</li>
                                <li>rusher: </li>
                                <li>shooter: predator</li>
                                <li>explosive: buggy, titan</li>
                            </ul>
                            <div>Heart of this strategy: orca, buggy and titan</div>
                            <div>Army upgrade order:</div>
                            <ul>
                                <li>max out orca level and ability</li>
                                <li>max out buggy level and ability</li>
                                <li>max out predator level and ability </li>
                                <li>if you have enough money for titan then replace your predator</li>
                            </ul>
                        </div>
                        <div>How to play</div>
                            <ul>
                                <li>spam as many vehicle as possible, spam priority follows upgrade order</li>
                                <li>try to clear enemy army asap</li>
                                <li>
                                    enemy is forced to use explosive to take down our vehicle <br/>
                                    => if he/she uses rocket => extremely good chance to hit enemy with your weapon <br/>
                                    => if he/she uses grenade => it will takes him/her longer to take down your unit => you have unit number advantage
                                </li>
                                <li>
                                    if your enemy still survives when time expires <br/>
                                    => he/she will soon out of explosive armo <br/>
                                    => time to end your fight and gain glory
                                </li>
                                <li>
                                    if you have no vehicle unit available, pick your unit that cost least energy
                                </li>
                            </ul>
                            <div>Typical play:</div>
                    </div>
                </div>

                <div className="box">
                    <div className="box-header"><span className="box-title">Army</span></div>
                    <div className="box-body">

                    </div>
                </div>

                <div className="box">
                    <div className="box-header"><span className="box-title">Weapon</span></div>
                    <div className="box-body">
                    </div>
                </div>
            </div>
        );
    }
}