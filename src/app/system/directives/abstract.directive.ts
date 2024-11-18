import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive({
    selector: '[appAbstractDirective]',
    standalone: true,
})
export class AbstractDirective implements OnDestroy {
    protected destroy$: Subject<void> = new Subject<void>();

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}