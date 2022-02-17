import React from "react";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "clock",
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

        if (hour === 12) {
            hour = 12;
            meridiem = 'PM';
        }
        if (hour > 12) hour = hour - 12;

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
