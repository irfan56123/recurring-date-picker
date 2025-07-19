import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isBefore,
  isEqual,
  startOfDay,
  getDay,
  startOfMonth,
  lastDayOfMonth,
} from 'date-fns';

const getNthWeekdayOfMonth = (baseDate, weekName, dayName) => {
  const weekMap = {
    First: 1,
    Second: 2,
    Third: 3,
    Fourth: 4,
    Last: -1,
  };

  const dayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const targetDay = dayMap[dayName];
  const week = weekMap[weekName];
  const monthStart = startOfMonth(baseDate);
  const monthEnd = lastDayOfMonth(baseDate);

  if (week === -1) {
    // Last occurrence
    for (let d = monthEnd; d >= monthStart; d = addDays(d, -1)) {
      if (getDay(d) === targetDay) return d;
    }
  } else {
    
    let count = 0;
    for (let d = monthStart; isBefore(d, addDays(monthEnd, 1)); d = addDays(d, 1)) {
      if (getDay(d) === targetDay) {
        count++;
        if (count === week) return d;
      }
    }
  }

  return null;
};

export function Recurrence({
  recurrenceOption,
  interval,
  startDate,
  endDate,
  selectedWeekdays = [],
  pattern,
}) {
  const dates = [];

  if (!startDate || !recurrenceOption || !interval) return [];

  const start = startOfDay(new Date(startDate));
  const end = endDate ? startOfDay(new Date(endDate)) : null;
  let current = new Date(start);

  while (!end || isBefore(current, end) || isEqual(current, end)) {
    switch (recurrenceOption) {
      case 'Daily': {
        dates.push(new Date(current));
        current = addDays(current, interval);
        break;
      }

      case 'Weekly': {
  const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const selectedDayNumbers = selectedWeekdays.map(day => dayMap[day]);

  for (let i = 0; i < 7; i++) {
    const temp = addDays(current, i);
    const day = temp.getDay();
    if (
      selectedDayNumbers.includes(day) &&
      (!end || isBefore(temp, end) || isEqual(temp, end))
    ) {
      dates.push(new Date(temp));
    }
  }
  current = addWeeks(current, interval);
  break;
}


      case 'Monthly': {
        const baseDate = new Date(current);
        if (pattern) {
          const parts = pattern.split(' ');
          if (parts.length !== 2) break;

          const [weekName, dayName] = parts;
          const patternDate = getNthWeekdayOfMonth(baseDate, weekName, dayName);
          if (patternDate && (!end || isBefore(patternDate, end) || isEqual(patternDate, end))) {
            dates.push(new Date(patternDate));
          }
        } else if (!end || isBefore(current, end) || isEqual(current, end)) {
          dates.push(new Date(current));
        }
        current = addMonths(current, interval);
        break;
      }

      case 'Yearly': {
        const baseDate = new Date(current.getFullYear(), current.getMonth(), 1);
        if (pattern) {
          const parts = pattern.split(' ');
          if (parts.length !== 2) break;

          const [weekName, dayName] = parts;
          const patternDate = getNthWeekdayOfMonth(baseDate, weekName, dayName);
          if (patternDate && (!end || isBefore(patternDate, end) || isEqual(patternDate, end))) {
            dates.push(new Date(patternDate));
          }
        } else if (!end || isBefore(current, end) || isEqual(current, end)) {
          dates.push(new Date(current));
        }

        current = addYears(current, interval);
        break;
      }

      default:
        return [];
    }
  }

  console.log('🗓️ Recurrence Generated:', dates.map(d => d.toISOString()));
  return dates;
}



