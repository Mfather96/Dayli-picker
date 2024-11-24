import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DateService } from '../../system/services/date.service';
import { BehaviorSubject, takeUntil } from 'rxjs';
import {CommonModule} from '@angular/common';
import {ITask} from '../../system/interfaces/interface';
import {TaskComponent} from './task/task.component';
import { PaginationDirective } from '../../system/directives/pagination.directive';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
    selector: '[app-task-list]',
    standalone: true,
    imports: [
        CommonModule,
        TaskComponent,
        PaginationDirective
    ],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent extends AbstractComponent implements OnInit {
    public taskList$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);

    private readonly dateService = inject(DateService);
    private readonly cdr = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.dateService.taskList$
            .pipe(
                takeUntil(this.destroy$)
            ).subscribe(list => {
            // this.taskList$.next([])
            setTimeout(() => {
            })
            this.taskList$.next(this.sortTasks(list));
            // this.cdr.markForCheck();
        })
    }

    protected sortTasks(tasks: ITask[]): ITask[] {
        return tasks.sort((firstElement, secondElement) => {
            return firstElement.date.getTime() - secondElement.date.getTime();
        })
    }
}
