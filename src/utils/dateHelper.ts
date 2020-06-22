// import DateFormat from 'dateformat';

const interval = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

export const isDateOlderThan24Hours = (date: number): boolean => Date.now() - date > 1000 * 60 * 60 * 24;

// export const convertDateToString = (date: number | Date): string => {
//   return date ? DateFormat(date instanceof Date ? date : new Date(date), 'dd/mm/yyyy HH:MM', true) : '';
// };

export const getStartOfDay = (date: Date): Date => new Date(Math.floor(date.getTime() / interval) * interval);

export const getEndOfDay = (date: Date): Date => new Date(Math.ceil(date.getTime() / interval) * interval - 1);
