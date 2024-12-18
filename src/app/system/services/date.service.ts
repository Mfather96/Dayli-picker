import { Injectable } from '@angular/core';
import { CalendarTasks, ITask, Task } from '../interfaces/interface';
import {BehaviorSubject} from 'rxjs';
import {taskListMocks} from './tasks-mocks';

@Injectable({
    providedIn: 'root',
})
export class DateService {
    public taskList$ = new BehaviorSubject<ITask[]>(taskListMocks);
    public newTaskList$ = new BehaviorSubject<Task[]>([]);

    private tasksList: ITask[] = taskListMocks;
    private calendarTasks: CalendarTasks = {};

    // constructor() {
    //     this.taskList$.next(this.tasksList)
    // }

    public get calendarTasksPublic() {
        return this.calendarTasks;
    }

    public setTask(task: ITask): void {
        if (!this.calendarTasks[task.year]) {
            this.calendarTasks[task.year] = {};
        }
        if (!this.calendarTasks[task.year][task.month]) {
            this.calendarTasks[task.year][task.month] = {};
        }
        if (!this.calendarTasks[task.year][task.month][task.day]) {
            this.calendarTasks[task.year][task.month][task.day] = { task: '' };
        }

        this.calendarTasks[task.year][task.month][task.day].task = task.taskString;
        this.pushTask(task);
    }

    public addTask(task: Task): void {
        const arr = [...this.newTaskList$.value, task];
        this.newTaskList$.next(arr);
    }

    private pushTask(task: ITask): void {
        if (!this.tasksList.length) {
            this.tasksList.push(task);
            return;
        }

        let taskIndex: number = 0;
        const hasSameTask = this.tasksList.some((tsk, index) => {
            taskIndex = index;
            return tsk.id === task.id
        });

        hasSameTask
            ? this.tasksList[taskIndex] = task
            : this.tasksList.push(task);

        this.taskList$.next(this.tasksList);
    }
}
