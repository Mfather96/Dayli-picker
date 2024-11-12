import dayjs from "dayjs";
import {months} from "../constants/date.constants";
import {IMonth} from "../interfaces/interface";

export class DateHelper {

    public static getYear(): number {
        return dayjs().year();
    }

    public static getMonthsArr(): IMonth[] {
        return months;
    }

    public static getCurrentMonth(): IMonth {
        return months[dayjs().month()];
    }

    public static getDay(day: number, month: number): string {
        return dayjs().date(day).month(month).format('DD.MM.YYYY');
    }

    public static today(): string {
        return dayjs().format('DD.MM.YYYY');
    }

    public static calculateMonthDays(
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
}
