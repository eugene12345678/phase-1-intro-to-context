function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return { firstName, familyName, title, payPerHour, timeInEvents: [], timeOutEvents: [] };
  }
  
  const createEmployeeRecords = data => data.map(createEmployeeRecord);
  
  const isValidTimestamp = ts => /^\d{4}-\d{2}-\d{2} \d{4}$/.test(ts);
  
  const addTimeEvent = (emp, ds, type) => {
    if (!isValidTimestamp(ds)) throw new Error("Invalid timestamp format");
    const [date, hour] = ds.split(' ');
    const event = { type, hour: parseInt(hour), date };
    if (type === "TimeIn") {
      emp.timeInEvents.push(event);
    } else if (type === "TimeOut") {
      emp.timeOutEvents.push(event);
    }
    return emp;
  };
  
  const createTimeInEvent = (emp, ds) => addTimeEvent(emp, ds, "TimeIn");
  const createTimeOutEvent = (emp, ds) => addTimeEvent(emp, ds, "TimeOut");
  
  const parseTimestamp = ts => {
    const [date, hour] = ts.split(' ');
    const [year, month, day] = date.split('-');
    return new Date(year, month - 1, day, Math.floor(hour / 100), hour % 100);
  };
  
  const hoursWorkedOnDate = (emp, date) => {
    const inEvent = emp.timeInEvents.find(e => e.date === date);
    const outEvent = emp.timeOutEvents.find(e => e.date === date);
    if (!inEvent || !outEvent) throw new Error("Mismatched timeIn and timeOut events");
  
    return (parseTimestamp(`${outEvent.date} ${outEvent.hour}`) - parseTimestamp(`${inEvent.date} ${inEvent.hour}`)) / 3600000;
  };
  
  const wagesEarnedOnDate = (emp, date) => hoursWorkedOnDate(emp, date) * emp.payPerHour;
  
  const allWagesFor = emp => emp.timeInEvents.reduce((total, { date }) => total + wagesEarnedOnDate(emp, date), 0);
  
  const calculatePayroll = employees => employees.reduce((total, emp) => total + allWagesFor(emp), 0);
  