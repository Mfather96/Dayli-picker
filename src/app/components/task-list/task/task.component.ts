import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import {ITask} from '../../../system/interfaces/interface';
import {CommonModule} from '@angular/common';
import {TextPipe} from '../../../system/pipes/text.pipe';

@Component({
  selector: '[app-task]',
  standalone: true,
  imports: [
    CommonModule,
    TextPipe,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnChanges{

    @Input() task: ITask | null = null;

    private readonly cdr = inject(ChangeDetectorRef);

    ngOnChanges({task}: SimpleChanges): void {
        if (task) {
          this.cdr.markForCheck();
        }
    }
}
