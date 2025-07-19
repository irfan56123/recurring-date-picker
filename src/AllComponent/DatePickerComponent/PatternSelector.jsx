import React from 'react';
import useStateStore from '../stateManager/stateStore';

const weekOptions = ['First', 'Second', 'Third', 'Fourth', 'Last'];
const dayOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const PatternSelector = () => {
  const recurrenceOption = useStateStore((state) => state.recurrenceOption);
  const pattern = useStateStore((state) => state.pattern);
  const setPattern = useStateStore((state) => state.setPattern);
  if (!['Monthly', 'Yearly'].includes(recurrenceOption)) return null;

  const [week, day] = pattern?.split(' ') || ['', ''];

  const updatePattern = (newWeek, newDay) => {
    setPattern(`${newWeek} ${newDay}`);
  };

  return (
    <div className="p-4">
      <label className="block text-sm font-medium mb-2">
        Recurrence Pattern (e.g. Second Tuesday)
      </label>

      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={week}
          onChange={(e) => updatePattern(e.target.value, day)}
          className="border px-3 py-2 rounded-md w-full sm:w-1/2"
        >
          <option value="">Select Week</option>
          {weekOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <select
          value={day}
          onChange={(e) => updatePattern(week, e.target.value)}
          className="border px-3 py-2 rounded-md w-full sm:w-1/2"
        >
          <option value="">Select Day</option>
          {dayOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PatternSelector;


