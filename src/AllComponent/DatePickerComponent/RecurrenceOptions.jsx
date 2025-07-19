import React, { useEffect, useRef } from 'react';
import useStateStore from '../stateManager/stateStore'; 

const RecurrenceOptions = () => {
  const recurrenceOption = useStateStore((state) => state.recurrenceOption);
  const setRecurrenceOption = useStateStore((state) => state.setRecurrenceOption);

  const setSelectedWeekdays = useStateStore((state) => state.setSelectedWeekdays);
  const setInterval = useStateStore((state) => state.setInterval);
  const setPattern = useStateStore((state) => state.setPattern);
  const setStartDate = useStateStore((state) => state.setStartDate);
  const setEndDate = useStateStore((state) => state.setEndDate);

  const prevOptionRef = useRef(recurrenceOption);

  useEffect(() => {
    
    if (recurrenceOption !== prevOptionRef.current) {
      
      setSelectedWeekdays([]);
      setInterval(1);
      setPattern(null);
      setStartDate(null);
      setEndDate(null);

      prevOptionRef.current = recurrenceOption;
    }
  }, [recurrenceOption]);

  return (
    <div className="recurring-container p-4">
       <div className="recurring-group">
      <label className="recurring-label block text-sm font-medium mb-2">Recurrence Type</label>
      <select
      
        value={recurrenceOption}
        onChange={(e) => setRecurrenceOption(e.target.value)}
        className="recurring-select w-full border p-2 rounded"
      >
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      </div>
    </div>
  );
};

export default RecurrenceOptions;



