function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}
function createTimeInEvent(employeeRecord, dateTimeString) {
  let [date, hour] = dateTimeString.split(' ');

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10)
  });

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
  let [date, hour] = dateTimeString.split(' ');

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10)
  });

  return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, date) {
  let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
  let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);

  return (timeOut.hour - timeIn.hour) / 100;
}
function wagesEarnedOnDate(employeeRecord, date) {
  let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}
function allWagesFor(employeeRecord) {
  let datesWorked = employeeRecord.timeInEvents.map(event => event.date);

  let totalWages = datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date);
  }, 0);

  return totalWages;
}
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPayroll, employee) => {
    return totalPayroll + allWagesFor(employee);
  }, 0);
}
