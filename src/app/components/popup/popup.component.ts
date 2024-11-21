import {CommonModule} from '@angular/common';
import { Component, HostBinding, Input, TemplateRef } from '@angular/core';

@Component({
  selector: '[app-popup]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
    @Input() template: TemplateRef<unknown> | null = null;

    @HostBinding('class.empty')
    get isTemplateNullable(): boolean {
        return !this.template;
    }
}
