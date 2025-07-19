
import { Recurrence } from '../AllComponent/utils/recurrence';

describe('Recurrence Function', () => {
  const startDate = '2025-07-01';
  const endDate = '2025-07-10';

  test('Generates daily recurrence every 1 day', () => {
    const result = Recurrence({
      recurrenceOption: 'Daily',
      interval: 1,
      startDate,
      endDate,
    });

    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toBeInstanceOf(Date);
  });

  test('Generates weekly recurrence on Mon and Wed every 1 week', () => {
    const result = Recurrence({
      recurrenceOption: 'Weekly',
      interval: 1,
      startDate: '2025-07-01',
      endDate: '2025-07-20',
      selectedWeekdays: ['Mon', 'Wed'],
    });

    expect(result.length).toBeGreaterThan(0);
    for (const date of result) {
      const day = date.getDay();
      expect([1, 3]).toContain(day); // 1 = Mon, 3 = Wed
    }
  });

  test('Generates monthly recurrence: Second Tuesday using pattern string', () => {
    const result = Recurrence({
      recurrenceOption: 'Monthly',
      interval: 1,
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      pattern: 'Second Tuesday',
    });

    expect(result.length).toBeGreaterThan(0);
    for (const date of result) {
      expect(date.getDay()).toBe(2); // Tuesday
    }
  });

  test('Generates yearly recurrence: Last Friday using pattern string', () => {
    const result = Recurrence({
      recurrenceOption: 'Yearly',
      interval: 1,
      startDate: '2020-01-01',
      endDate: '2025-01-01',
      pattern: 'Last Friday',
    });

    expect(result.length).toBeGreaterThan(0);
    for (const date of result) {
      expect(date.getDay()).toBe(5); // Friday
    }
  });
});

