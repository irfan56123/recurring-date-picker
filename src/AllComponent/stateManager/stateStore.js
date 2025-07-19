import { create } from 'zustand';
import { Recurrence } from '../utils/recurrence';

const useStateStore = create((set, get) => ({
  startDate: null,
  endDate: null,
  interval: 1,
  recurrenceOption: 'Daily',
  selectedWeekdays: [],
  pattern: null,
  recurringDates: [],

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setInterval: (val) =>
  set((state) => {
    if (state.interval !== val) return { interval: val };
    return state;
  }),

setRecurrenceOption: (option) =>
  set((state) => {
    if (state.recurrenceOption !== option) {
      return { recurrenceOption: option };
    }
    return state; 
  }),

setSelectedWeekdays: (days) =>
  set((state) => {
    const areSame = Array.isArray(days) &&
      days.length === state.selectedWeekdays.length &&
      days.every((d, i) => d === state.selectedWeekdays[i]);
    if (!areSame) {
      return { selectedWeekdays: days };
    }
    return state;
  }),

  setPattern: (pattern) =>
  set((state) => {
    if (state.pattern !== pattern) return { pattern };
    return state;
  }),
  setRecurringDates: (dates) => set({ recurringDates: dates }),

  generateRecurringDates: () => {
  const {
    startDate,
    endDate,
    interval,
    recurrenceOption,
    selectedWeekdays,
    pattern,
  } = get();

  console.log("Generating with:", {
    startDate,
    endDate,
    interval,
    recurrenceOption,
    selectedWeekdays,
    pattern,
  });

  try {
    if (
      !startDate || !endDate || !interval || !recurrenceOption ||
      (recurrenceOption === 'Weekly' && selectedWeekdays.length === 0) ||
      (['Monthly', 'Yearly'].includes(recurrenceOption) && !pattern)
    ) {
      set({ recurringDates: [] });
      return;
    }

    const dates = Recurrence({
      startDate,
      endDate,
      interval,
      recurrenceOption,
      selectedWeekdays,
      pattern,
    });

    const validDates = Array.isArray(dates)
      ? dates.filter((d) => d instanceof Date && !isNaN(d))
      : [];

    set({ recurringDates: validDates });
  } catch (error) {
    console.error('Error generating recurring dates:', error);
    set({ recurringDates: [] });
  }
},

}));

export default useStateStore;


