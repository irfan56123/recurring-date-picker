import React, { useEffect, useRef, useState } from 'react';
import RecurrenceOptions from './RecurrenceOptions';
import IntervalSelector from './IntervalSelector';
import WeekdaySelector from './WeekdaySelector';
import PatternSelector from './PatternSelector';
import DatePicker from './DatePicker';
import PreviewCalendar from './PreviewCalendar';
import useStateStore from '../stateManager/stateStore';

const ParentDatePicker = () => {
  const {
    startDate,
    endDate,
    interval,
    recurrenceOption,
    selectedWeekdays,
    pattern,
    generateRecurringDates,
  } = useStateStore();

  const [lastKey, setLastKey] = useState('');

  useEffect(() => {
    const shouldGenerate =
      startDate &&
      endDate &&
      interval &&
      recurrenceOption &&
      (
        recurrenceOption === 'Daily' ||
        (recurrenceOption === 'Weekly' && selectedWeekdays.length > 0) ||
        (['Monthly', 'Yearly'].includes(recurrenceOption) && pattern)
      );

    const currentKey = JSON.stringify({
      startDate,
      endDate,
      interval,
      recurrenceOption,
      selectedWeekdays,
      pattern,
    });

    if (shouldGenerate && currentKey !== lastKey) {
      generateRecurringDates();
      setLastKey(currentKey);
    }
  }, [startDate, endDate, interval, recurrenceOption, selectedWeekdays, pattern]);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-2xl space-y-4 border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Recurring Date Picker</h2>
      <RecurrenceOptions />
      <IntervalSelector />
      {recurrenceOption === 'Weekly' && <WeekdaySelector />}
      {['Monthly', 'Yearly'].includes(recurrenceOption) && <PatternSelector />}
      <DatePicker />
      <PreviewCalendar />
    </div>
  );
};

export default ParentDatePicker;



