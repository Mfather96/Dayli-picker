import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { months } from '../constants/date.constants';
import { CalendarTasks, IMonth } from '../interfaces/interface';

@Injectable({
    providedIn: 'root',
})
export class DateService {
    private calendarTasks: CalendarTasks = {};

    constructor() {}

    public get some() {
        return 1;
    }

    public getYear(): number {
        return dayjs().year();
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
        for (let i = 1; i <= daysAmount; i++) {
            monthDays.push(i);
        }

        for (let i = 1; i < weekDayStartMonth; i++) {
            monthDays.unshift(0);
        }

        for (let i = monthDays.length; i < 42; i++) {
            monthDays.push(0);
        }

        return monthDays;
    }

    public get calendarTasksPublic() {
        return this.calendarTasks;
    }

    public setTask(
        year: string,
        month: string,
        day: string,
        taskString: string,
    ): void {
        if (!this.calendarTasks[year]) {
            this.calendarTasks[year] = {};
        }
        if (!this.calendarTasks[year][month]) {
            this.calendarTasks[year][month] = {};
        }
        if (!this.calendarTasks[year][month][day]) {
            this.calendarTasks[year][month][day] = { task: '' };
        }

        this.calendarTasks[year][month][day].task = taskString;
    }
}
