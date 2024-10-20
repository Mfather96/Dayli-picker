import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {DateService} from '../../system/services/date.service';
import dayjs from 'dayjs';
import {DAYS} from '../../system/constants/date.constants';
import {NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import {CreateTaskComponent} from '../create-task/create-task.component';
import {DayComponent} from '../day/day.component';

@Component({
    selector: '[app-month]',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        CreateTaskComponent,
        NgTemplateOutlet,
        DayComponent
    ],
    templateUrl: './month.component.html',
    styleUrl: './month.component.scss'
})
export class MonthComponent implements OnInit {

    @Input() monthNumber!: number;
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

    constructor(
        private dateService: DateService
    ) {}

    ngOnInit(): void {
        this.setData()
        this.monthDays = this.dateService.calculateMonthDays(
            this.monthDays,
            this.daysAmount,
            this.weekDayStartMonth
        )
    }

    public get today(): string {
        return this.dateService.today();
    }

    public getDay(day: any): string {
        return this.dateService.getDay(day, this.monthNumber);
    }

    public openDescription(event: Event): void {

        // const containers = (this.month.nativeElement as HTMLDivElement).querySelectorAll('.container-day');
        // const currentContainer = (event.target as HTMLDivElement).querySelector('.container-day');
        // const currentOpen = Boolean(currentContainer?.classList.contains('open'));
        // if (event.target == currentContainer) {
        //     console.log(event.target);
        //     return
        // }

        // if (currentOpen) {
        //     currentContainer?.classList.add('open');
        // }

        // for(let container of Array.from(containers)) {
        //     if (container.classList.contains('open')) {

        //         container.classList.remove('open');
        //     }
        // }


        // if(currentContainer) {
        //     currentContainer.classList.toggle('open');
        // }
    }

    private setData(): void {
        this.daysAmount = dayjs(dayjs().month(this.monthNumber)).daysInMonth();
        this.weekDayStartMonth = dayjs(`2024-${this.monthNumber + 1}`).day() === 0
             ? 7
             : dayjs(`2024-${this.monthNumber + 1}`).day();
    }
}
