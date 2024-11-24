import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import { DateService } from '../../system/services/date.service';
import { MonthComponent } from '../month/month.component';
import { CommonModule, NgFor } from '@angular/common';
import { IMonth } from '../../system/interfaces/interface';
import {DateHelper} from '../../system/helpers/date.helper';
import {CarouselDirective} from '../../system/directives/carousel.directive';

@Component({
    selector: '[app-calendar]',
    standalone: true,
    imports: [
        CommonModule,
        MonthComponent,
        CarouselDirective,
    ],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
    public monthArr: IMonth[] = [];
    public currentMonth: number = dayjs().month();

    constructor(private dateService: DateService) {}

    ngOnInit(): void {
        this.monthArr = DateHelper.getMonthsArr();
    }

    public get sortedMonth(): IMonth[] {
        return DateHelper.getMonthsArr().reverse();
    }
}
