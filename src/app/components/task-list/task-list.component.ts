import { Component, OnInit } from '@angular/core';
import { DateService } from '../../system/services/date.service';
import { BehaviorSubject } from 'rxjs';
import {NgFor} from '@angular/common';
import {ITask} from '../../system/interfaces/interface';
import {TaskComponent} from './task/task.component';

@Component({
    selector: '[app-task-list]',
    standalone: true,
    imports: [NgFor, TaskComponent],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
    public tasks: ITask[] | null = [];

    constructor(private dateService: DateService) {}

    ngOnInit(): void {
        this.tasks = this.dateService.tasksList
    }
}
