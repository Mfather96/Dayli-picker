import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DateService } from '../../system/services/date.service';
import dayjs from 'dayjs';
import { DAYS } from '../../system/constants/date.constants';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { DayComponent } from '../day/day.component';
import {DateHelper} from '../../system/helpers/date.helper';

@Component({
    selector: '[app-month]',
    standalone: true,
    imports: [NgFor, NgIf, CreateTaskComponent, NgTemplateOutlet, DayComponent],
    templateUrl: './month.component.html',
    styleUrl: './month.component.scss',
})
export class MonthComponent implements OnInit {
    @Input() monthIndex!: number;
    @Input() monthName!: string;

    @ViewChild('month') month!: ElementRef;

    public daysAmount!: number;
    public weekDayStartMonth!: number;
    public monthDays: number[] = [];
    public daysNames: string[] = DAYS;
    public isOpen: boolean = false;

    protected currentYear: number = dayjs().year();
    protected currentMonth: number = dayjs().month();
    protected currentDay: number = dayjs().date();

    constructor(private dateService: DateService) {}

    ngOnInit(): void {
        this.setData();
        this.monthDays = DateHelper.calculateMonthDays(
            this.monthDays,
            this.daysAmount,
            this.weekDayStartMonth,
        );
    }

    public get today(): string {
        return DateHelper.today();
    }

    public getDay(day: number): string {
        return DateHelper.getDay(day, this.monthIndex);
    }

    private setData(): void {
        this.daysAmount = dayjs(dayjs().month(this.monthIndex)).daysInMonth();
        this.weekDayStartMonth =
            dayjs(`2024-${this.monthIndex + 1}`).day() === 0
                ? 7
                : dayjs(`2024-${this.monthIndex + 1}`).day();
    }
}
