import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CalendarComponent } from '../../../components/calendar/calendar.component';
import {TaskListComponent} from '../../../components/task-list/task-list.component';
import {CommonModule} from '@angular/common';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent  {
}
