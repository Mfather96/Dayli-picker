import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: '[app-abstract]',
  standalone: true,
  imports: [],
  templateUrl: './abstract.component.html',
  styleUrl: './abstract.component.scss'
})
export class AbstractComponent implements OnDestroy{

  protected destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
