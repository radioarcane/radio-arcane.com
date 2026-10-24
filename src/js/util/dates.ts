import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const defaultTimeZone = 'America/Kentucky/Louisville';

export function localDateTimeToUtcDate(date: string | Date, tz?: string): Date {
   const timezone: string = tz || defaultTimeZone;
   return dayjs.tz(date, timezone).utc().toDate();
}

export function localDateTimeToUtcString(
   date: string | Date,
   tz?: string,
): string {
   const timezone: string = tz || defaultTimeZone;
   const utcDate = localDateTimeToUtcDate(date, timezone);
   return dayjs.utc(utcDate).format();
}

export function utcDateTimeToLocalDate(date: string | Date, tz?: string): Date {
   const timezone: string = tz || defaultTimeZone;
   return dayjs.utc(date).tz(timezone, false).toDate();
}

export function utcDateTimeToLocalString(
   date: string | Date,
   tz?: string,
): string {
   const timezone: string = tz || defaultTimeZone;
   const utcDate = utcDateTimeToLocalDate(date, timezone);
   return dayjs(utcDate).tz(timezone, false).format('YYYY-MM-DDTHH:mm:ss');
}
