import React, { Component } from 'react';

function h_to_hms(h) {
    var x = h * 3600;
    var hh = Math.floor(x / 3600);
    if (hh < 10) hh = "0" + hh;
    var y = x % 3600;
    var mm = Math.floor(y / 60);
    if (mm < 10) mm = "0" + mm;
    var ss = Math.round(y % 60);
    if (ss < 10) ss = "0" + ss;
    return hh + ":" + mm + ":" + ss;
}

class Clock extends Component {
    constructor(props) {
        super(props);

        this.state = { time: new Date() }

        setInterval(() => this.setState({time: new Date()}), 50);
    }

    render() {
        // from https://jtauber.github.io/mars-clock/
        const utc = this.state.time.getTime();
        const jd_ut = 2440587.5 + utc/8.64e7;
        const jd_tt = jd_ut + (37 + 32.184)/86400;
        const delta_t_j2000 = jd_tt - 2451545;
        const msd = ((delta_t_j2000 - 4.5)/1.027491252) + 44796 - 0.00096
        const mtc = (24*msd)%24;
        return <span className="Clock">{Math.floor(msd)}, {h_to_hms(mtc)} MTC ({this.state.time.toUTCString()})</span>;
    }
}

export default Clock;