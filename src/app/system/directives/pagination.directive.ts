import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[appPagination]',
    standalone: true,
})
export class PaginationDirective<T> implements OnInit{
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() amountItemsPerPage: number | null | undefined;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<T>
    ) {}

    ngOnInit(): void {

    }
}
