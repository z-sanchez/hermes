function Clock() {
  const today = new Date();
  let hour = today.getHours(),
    minute = today.getMinutes();

  if (hour === 12) hour = 12;
  if (hour > 12) hour = hour - 12;

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;

  document.getElementById('clock').innerHTML = hour + ":" + minute;

  setTimeout(() => { Clock()}, 1000);
}

export default Clock;
