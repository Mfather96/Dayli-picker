import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {PopupService} from './system/services/popup.service';
import {DumbNgIfDirective} from './system/directives/dumbNgIf.directive';

@Component({
    selector: '[app-root]',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        DumbNgIfDirective
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    title = 'daily-picker';

    @ViewChild('viewportPopup', {static: true, read: ViewContainerRef})
    private readonly viewport: ViewContainerRef | null = null;

    constructor(
        private popupService: PopupService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        if (this.viewport) {
            this.popupService.init(this.viewport);
        }
    }
}
