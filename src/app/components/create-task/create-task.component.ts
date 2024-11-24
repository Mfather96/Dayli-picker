import {CommonModule} from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import dayjs from 'dayjs';
import {debounceTime} from 'rxjs/operators';
import {DateService} from '../../system/services/date.service';
import {months} from '../../system/constants/date.constants';
import {IDateInfo} from '../../system/interfaces/interface';
import {PopupService} from '../../system/services/popup.service';

@Component({
    selector: '[app-create-task]',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    templateUrl: './create-task.component.html',
    styleUrl: './create-task.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTaskComponent implements OnInit {
    @Input() dateInfo!: IDateInfo;
    @Input() selectedDate: string | null = null;

    @Output() hasTaskListen = new EventEmitter<boolean>()

    @ViewChild('textarea') textAreaRef!: HTMLTextAreaElement;
    public myForm!: FormGroup;

    private readonly dateService = inject(DateService);
    private readonly popupService = inject(PopupService);
    private readonly cdr = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.myForm = new FormGroup({
            contentFormControl: new FormControl(null),
        });

        if (this.dateInfo.monthIndex) {
            this.taskHandler();
        }
    }

    public focusTextarea(): void {
        this.textAreaRef.focus();
    }

    protected taskHandler(): void {
        this.myForm.valueChanges.pipe(debounceTime(1000)).subscribe((v) => {
            this.dateService.setTask({
                id: (String(dayjs().year() + months[this.dateInfo.monthIndex].title + this.dateInfo.day)),
                year: String(dayjs().year()),
                month: months[this.dateInfo.monthIndex].title,
                day: String(this.dateInfo.day),
                taskString: v.contentFormControl,
                date: new Date(`${dayjs().year()}-${this.dateInfo.monthIndex+1}-${this.dateInfo.day}`)
            });

            this.hasTaskListen.emit(this.checkTask());
            this.popupService.showPopupNewTask();
            this.cdr.markForCheck();
        });
    }

    protected checkTask(): boolean {
        const calendar = this.dateService.calendarTasksPublic;
        const year = String(dayjs().year());
        const month = months[this.dateInfo.monthIndex].title;
        const day = String(this.dateInfo.day);

        if (!calendar[year][month]) {
            return false;
        }

        if (!calendar[year][month][day]) {
            return false;
        }

        return true;
    }
}
