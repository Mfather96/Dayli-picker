import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import {DateService} from '../../system/services/date.service';
import {MonthComponent} from '../month/month.component';
import {NgFor} from '@angular/common';
import {interval} from 'rxjs';
import {IMonth} from '../../system/interfaces/interface';

@Component({
  selector: '[app-calendar]',
  standalone: true,
  imports: [MonthComponent, NgFor],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{

    public monthArr: IMonth[] = [];
    public currentMonth: number = dayjs().month();

    constructor(
        private dateService: DateService
    ){

    }

    ngOnInit(): void {
        this.monthArr = this.dateService.getMonthsArr();
    }

    public get sortedMonth(): IMonth[] {
        return this.dateService.getMonthsArr().reverse();
    }
}
