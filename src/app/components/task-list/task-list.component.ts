import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DateService } from '../../system/services/date.service';
import { BehaviorSubject } from 'rxjs';
import {CommonModule, NgFor} from '@angular/common';
import {ITask} from '../../system/interfaces/interface';
import {TaskComponent} from './task/task.component';
import {ActiveShadowDirective} from '../../system/directives/activeShadow.directive';

@Component({
    selector: '[app-task-list]',
    standalone: true,
    imports: [
        CommonModule,
        TaskComponent,
        ActiveShadowDirective,
    ],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
    private taskList: ITask[] | null = [];

    constructor(private dateService: DateService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.dateService.taskList$.subscribe(list => {
            this.taskList = this.sortTasks(list);
            this.cdr.markForCheck();
        })
        this.cdr.markForCheck();
    }

    public get tasks(): ITask[] {
        if (this.taskList) {
            return this.sortTasks(this.taskList);
        } else {
            return []
        }
    }
    protected sortTasks(tasks: ITask[]): ITask[] {
        return tasks.sort((firstElement, secondElement) => {
            return firstElement.date.getTime() - secondElement.date.getTime();
        })
    }
}
