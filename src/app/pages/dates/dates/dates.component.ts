import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreateTaskComponent } from '../../../components/create-task/create-task.component';
import { TaskListComponent } from '../../../components/task-list/task-list.component';

@Component({
    selector: 'app-dates',
    standalone: true,
    imports: [RouterLink, CreateTaskComponent, TaskListComponent],
    templateUrl: './dates.component.html',
    styleUrl: './dates.component.scss',
})
export class DatesComponent {}
