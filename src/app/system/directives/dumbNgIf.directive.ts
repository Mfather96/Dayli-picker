import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[appDumbNgIf]',
    standalone: true,
})
export class DumbNgIfDirective<T> {
    @Input() set appDumbNgIf(value: T | null | undefined) {
        const isEmptyViewContainer = !this.viewContainerRef.length;

        if (value && isEmptyViewContainer) {
            this.viewContainerRef.createEmbeddedView(this.templateRef, {
                $implicit: value,
                some: 'some text',
            });

            return;
        }

        if (!value && !isEmptyViewContainer) {
            this.viewContainerRef.clear();
        }
    }

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<{$implicit: T, some: string}>
    ) {}
}
