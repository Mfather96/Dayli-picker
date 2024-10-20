import { Routes } from '@angular/router';
import {MainComponent} from './pages/main/main/main.component';
import {DatesComponent} from './pages/dates/dates/dates.component';

export const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: MainComponent},
    {path: 'dates', component: DatesComponent}
];
