import React from "react";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: null,
        };
    }

    componentDidMount() {
        this.ticker = setInterval(() => {
            this.clock();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.ticker);
    }

    clock() {
        const today = new Date();
        let hour = today.getHours(),
            minute = today.getMinutes(),
            meridiem = 'AM';

        if (hour === 12) hour = 12;

        if (hour === 0) hour = 1;
        else if (hour > 12) { hour = hour - 12; meridiem = 'PM'; }


        minute = minute < 10 ? "0" + minute : minute;

        this.setState({
            time: hour + ":" + minute + meridiem,
        });
    }

    render() {
        return <p id="clock">{this.state.time}</p>;
    }
}

export default Clock;
