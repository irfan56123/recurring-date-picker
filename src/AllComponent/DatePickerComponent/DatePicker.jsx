import React from 'react';
import useStateStore from '../stateManager/stateStore';

const DatePicker = () => {
  const startDate = useStateStore((state) => state.startDate);
  const endDate = useStateStore((state) => state.endDate);
  const setStartDate = useStateStore((state) => state.setStartDate);
  const setEndDate = useStateStore((state) => state.setEndDate);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    console.log("Selected Start Date:", selectedDate); 

  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    console.log("Selected Start Date:", selectedDate); 
  };

  return (
    <div className="recurring-group p-4">
      <label className="recurring-label block text-sm font-medium mb-1">
        Start Date
      </label>
      <input
        type="date"
        value={startDate || ''}
        onChange={handleStartDateChange}
        className="recurring-input border px-3 py-2 rounded-md w-full mb-4"
      />

      <label className="recurring-label block text-sm font-medium mb-1">
        End Date <span className="text-gray-500"></span>
      </label>
      <input
        type="date"
        value={endDate || ''}
        onChange={handleEndDateChange}
        className="recurring-input border px-3 py-2 rounded-md w-full"
      />
    </div>
  );
};

export default DatePicker;


