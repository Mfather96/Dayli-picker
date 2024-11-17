import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import dayjs from 'dayjs';
import { months } from '../../system/constants/date.constants';
import {CreateTaskComponent} from '../create-task/create-task.component';
import {IDateInfo} from '../../system/interfaces/interface';

@Component({
    selector: '[app-day]',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CreateTaskComponent,
    ],
    templateUrl: './day.component.html',
    styleUrl: './day.component.scss',
})
export class DayComponent implements OnInit {
    @Input() id!: string;
    @Input() day!: number;
    @Input() monthIndex!: number;

    public dateToday!: string;
    public isOpen: boolean = false;
    public toggleBackdrop: boolean = false;
    public hasTask: boolean = false;

    @ViewChild('createTask') createTaskComponent!: CreateTaskComponent;

    constructor() {}

    ngOnInit(): void {
        this.dateToday = `${this.day} ${months[this.monthIndex].title} ${dayjs().year()}`;
    }

    public get dateInfo(): IDateInfo {
        return {
            id: this.id,
            day: this.day,
            monthIndex: this.monthIndex
        }
    }

    public toggleCreateTask() {
        this.isOpen = !this.isOpen;
        this.toggleBackdrop = !this.toggleBackdrop;

        if (this.isOpen) {
            this.createTaskComponent?.focusTextarea()
        }
    }
}
