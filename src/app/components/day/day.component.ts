import {NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import { AfterViewInit, Component, DoCheck, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule} from '@angular/forms';
import {debounce, debounceTime, delay, Subject, takeLast} from 'rxjs';
import { DateService } from '../../system/services/date.service';
import dayjs from 'dayjs';

@Component({
  selector: '[app-day]',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent implements OnInit, AfterViewInit {
    @Input() id: string = '';
    @Input() day: number = 1;

    @ViewChild('dayOverhead', {read: ElementRef}) dayOverheadRef!: ElementRef;
    @ViewChild('textArea', {read: ElementRef}) textAreaRef!: ElementRef;

    public contentStream$: Subject<string> = new Subject();

    public isOpen: boolean = false;
    public myForm!: FormGroup;

    constructor(
        private dateService: DateService,
    ) {}

    @HostListener('blur') abc() {
        console.log('blured');

    }

    ngOnInit(): void {

        this.myForm = new FormGroup({
            contentFormControl: new FormControl(null),
        })

        this.myForm.valueChanges.pipe(
            debounceTime(1200)
        ).subscribe(v => {
            // this.dateService.setTask(
            //     String(dayjs().year()),
            //     String(dayjs().month()),
            //     String(this.day),
            //     v.contentFormControl
            // )
            this.dateService.setTask(
                '2024',
                'september',
                '20',
                v.contentFormControl
            )

            console.log(this.dateService.calendarTasksPublic);
            
        })
    }

    ngAfterViewInit(): void {
        this.dayOverheadRef.nativeElement.addEventListener('click', () => {
            this.isOpen = !this.isOpen
        });
    }
}
