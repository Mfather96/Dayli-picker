import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CalendarComponent } from '../../../components/calendar/calendar.component';
import {TaskListComponent} from '../../../components/task-list/task-list.component';

@Component({
    selector: '[app-main]',
    standalone: true,
    imports: [
        RouterLink,
        CalendarComponent,
        TaskListComponent
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
})
export class MainComponent {}
