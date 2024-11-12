import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { DateService } from '../../system/services/date.service';
import dayjs from 'dayjs';
import { months } from '../../system/constants/date.constants';

@Component({
    selector: '[app-day]',
    standalone: true,
    imports: [NgFor, NgIf, NgTemplateOutlet, ReactiveFormsModule, FormsModule],
    templateUrl: './day.component.html',
    styleUrl: './day.component.scss',
})
export class DayComponent implements OnInit, AfterViewInit {
    @Input() id: string = '';
    @Input() day: number = 1;
    @Input() monthIndex: number = 1;

    @ViewChild('dayOverhead', { read: ElementRef }) dayOverheadRef!: ElementRef;
    @ViewChild('textArea', { read: ElementRef }) textAreaRef!: ElementRef;

    public contentStream$: Subject<string> = new Subject();

    public isOpen: boolean = false;
    public myForm!: FormGroup;
    public hasTask: boolean = false;

    constructor(private dateService: DateService) {}

    ngOnInit(): void {
        this.myForm = new FormGroup({
            contentFormControl: new FormControl(null),
        });

        this.myForm.valueChanges.pipe(debounceTime(1200)).subscribe((v) => {
            this.dateService.setTask({
                id: (String(dayjs().year() + months[this.monthIndex].title + this.day)),
                year: String(dayjs().year()),
                month: months[this.monthIndex].title,
                day: String(this.day),
                taskString: v.contentFormControl,
            });

            this.hasTask = this.checkTask();
        });
    }

    ngAfterViewInit(): void {
        this.dayOverheadRef.nativeElement.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
        });
    }

    protected checkTask(): boolean {
        const calendar = this.dateService.calendarTasksPublic;
        const year = String(dayjs().year());
        const month = months[this.monthIndex].title;
        const day = String(this.day);

        if (!calendar[year][month]) {
            return false;
        }

        if (!calendar[year][month][day]) {
            return false;
        }

        return true;
    }
}
