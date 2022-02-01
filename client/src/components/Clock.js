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
      minute = today.getMinutes();

    if (hour === 12) hour = 12;
    if (hour > 12) hour = hour - 12;

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;

    this.setState({
      time: hour + ":" + minute,
    });
  }

  render() {
    return <p id="clock">{this.state.time}</p>;
  }
}

export default Clock;
