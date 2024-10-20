import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {CreateTaskComponent} from '../../../components/create-task/create-task.component';

@Component({
  selector: 'app-dates',
  standalone: true,
  imports: [RouterLink, CreateTaskComponent],
  templateUrl: './dates.component.html',
  styleUrl: './dates.component.scss'
})
export class DatesComponent {

}
