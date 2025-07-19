import React from 'react';
import useStateStore from '../stateManager/stateStore';

const IntervalSelector = () => {
  const interval = useStateStore((state) => state.interval);
  const setInterval = useStateStore((state) => state.setInterval);
  const recurrenceOption = useStateStore((state) => state.recurrenceOption);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setInterval(value);
    }
  };

  const getLabel = () => {
    switch (recurrenceOption) {
      case 'Daily':
        return 'day(s)';
      case 'Weekly':
        return 'week(s)';
      case 'Monthly':
        return 'month(s)';
      case 'Yearly':
        return 'year(s)';
      default:
        return 'unit(s)';
    }
  };

  return (
    <div className="p-4">
      <label className="block text-sm font-medium mb-1">
        Repeat every
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={interval || 1}
          onChange={handleChange}
          className="w-20 p-2 border rounded-lg"
        />
        <span className="capitalize">{getLabel()}</span>
      </div>
    </div>
  );
};

export default IntervalSelector;

