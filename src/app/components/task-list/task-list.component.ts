import { Component } from '@angular/core';
import { DateService } from '../../system/services/date.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
    public tasks: any[] = [];

    protected task$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private dateService: DateService) {}
}
