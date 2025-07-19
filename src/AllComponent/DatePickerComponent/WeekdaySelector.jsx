import React from 'react';
import useStateStore from '../stateManager/stateStore';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WeekdaySelector = () => {
  const recurrenceOption = useStateStore((state) => state.recurrenceOption);
  const selectedWeekdays = useStateStore((state) => state.selectedWeekdays);
  const setSelectedWeekdays = useStateStore((state) => state.setSelectedWeekdays);

  const toggleDay = (day) => {
    const updated = selectedWeekdays.includes(day)
      ? selectedWeekdays.filter((d) => d !== day)
      : [...selectedWeekdays, day];
    setSelectedWeekdays(updated);
  };

  if (recurrenceOption !== 'Weekly') return null;

  return (
    <div className="p-4">
      <label className="block text-sm font-medium mb-2">
        Select Days of the Week
      </label>
      <div className="flex gap-2 flex-wrap">
        {weekdays.map((day) => {
          const selected = selectedWeekdays.includes(day);
          return (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-3 py-1 rounded-lg border transition 
                ${selected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeekdaySelector;




