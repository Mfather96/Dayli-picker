import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import {months} from '../constants/date.constants';
import {CalendarTasks, IMonth} from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class DateService {

    private calendarTasks: CalendarTasks = {}

    constructor() { }

    public getYear(): number {
        return dayjs().year()
    }

    public getMonthsArr(): IMonth[] {
        return months;
    }

    public getCurrentMonth(): IMonth {
        return months[dayjs().month()];
    }

    public getDay(day: number, month: number): string {
        return dayjs().date(day).month(month).format('DD.MM.YYYY');
    }

    public today(): string {
        return dayjs().format('DD.MM.YYYY');
    }

    public calculateMonthDays(
        monthDays: number[],
        daysAmount: number,
        weekDayStartMonth: number,
    ): number[] {
        for(let i = 1; i <= daysAmount; i++) {
            monthDays.push(i);
        }

        for(let i = 1; i < weekDayStartMonth; i++) {
            monthDays.unshift(0)
        }

        for(let i = monthDays.length; i < 42; i++) {
            monthDays.push(0)
        }

        return monthDays
    }

    public setTask(
        year: string,
        month: string,
        day: string,
        taskString: string
    ): void {
        this.calendarTasks[year][month][day].task = taskString;
    }
}
