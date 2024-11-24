import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskListComponent } from '../../../components/task-list/task-list.component';

@Component({
    selector: '[app-dates]',
    standalone: true,
    imports: [RouterLink, TaskListComponent],
    templateUrl: './dates.component.html',
    styleUrl: './dates.component.scss',
})
export class DatesComponent {}
