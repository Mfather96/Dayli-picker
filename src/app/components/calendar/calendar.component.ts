import {
    ChangeDetectionStrategy,
    Component,
    model,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { DateService } from '../../system/services/date.service';
import { CommonModule } from '@angular/common';
import {MatCalendarUserEvent, MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: '[app-calendar]',
    standalone: true,
    imports: [
        CommonModule,
        MatDatepickerModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        provideNativeDateAdapter(),
    ],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
    selected = model<Date | null>(null);
    textareaForm!: FormGroup;

    constructor(
        private readonly dateService: DateService
    ) {}

    ngOnInit(): void {
        this.textareaForm = new FormGroup({
            taskText: new FormControl(this.setInitialValue())
        })
    }

    check() {
        console.log(this.dateService.newTaskList$.value);

        this.textareaForm.setValue({taskText: this.setInitialValue()});
    }

    submit() {
        this.dateService.addTask({
            date: this.selected() as Date,
            value: this.textareaForm?.value.taskText
        })
    }

    setInitialValue(): string {
        const date = this.selected() as Date;
        let value = '';

        for (const task of this.dateService.newTaskList$.value) {

            if (date.getTime() === task.date.getTime()) {
                value = task.value;
                break
            }
            return ''
        }

        return value
    }
}
