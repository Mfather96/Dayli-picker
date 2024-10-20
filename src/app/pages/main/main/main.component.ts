import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {CalendarComponent} from '../../../components/calendar/calendar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, CalendarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
