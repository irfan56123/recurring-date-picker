import React, { useState } from 'react';
import useStateStore from '../stateManager/stateStore';

const PreviewCalendar = () => {
  const dates = useStateStore((state) => state.recurringDates);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    setShowPreview(true);
  };

  return (
    <div className="border-t pt-4 mt-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        onClick={handleGenerate}
      >
        Generate Preview
      </button>

      {showPreview && (
        <>
          <h3 className="text-lg font-semibold mb-2">Preview</h3>

          {!Array.isArray(dates) ? (
            <div className="text-red-500">Error: Invalid date array</div>
          ) : dates.length === 0 ? (
            <div className="text-gray-500">No recurring dates to preview.</div>
          ) : (
            <ul className="space-y-1 list-disc list-inside text-sm text-gray-700">
              {dates.map((date, index) => (
                <li key={index}>{new Date(date).toDateString()}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default PreviewCalendar;





