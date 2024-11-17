import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CalendarComponent } from '../../../components/calendar/calendar.component';
import {TaskListComponent} from '../../../components/task-list/task-list.component';
import {CommonModule} from '@angular/common';
import {interval} from 'rxjs';

@Component({
    selector: '[app-main]',
    standalone: true,
    imports: [
        RouterLink,
        CalendarComponent,
        TaskListComponent,
        CommonModule
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
    public isChange: boolean = false;

    ngOnInit(): void {
    }
}
