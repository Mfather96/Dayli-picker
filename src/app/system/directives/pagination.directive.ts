import {Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef} from "@angular/core";
import { AbstractDirective } from "./abstract.directive";
import { BehaviorSubject, map, takeUntil } from "rxjs";
import { IPaginationContext } from "../interfaces/interface";

@Directive({
    selector: '[appPagination]',
    standalone: true,
})
export class PaginationDirective<T> extends AbstractDirective implements OnInit {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationItemsPerPage: number = 10;

    protected amountItems$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
    protected activePage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    protected pagesAmount: Set<number> = new Set([]);

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<IPaginationContext<T>>,
    ) {
        super()
    }

    ngOnInit(): void {
        this.calcAmountPages();

        if (this.appPaginationItemsPerPage) {
            this.amountItems$.next(this.appPaginationItemsPerPage)
        }

        this.listenAmountItems();
    }

    private listenAmountItems() {
        this.activePage$
            .pipe(
                map((activePageNumber) => this.getItemsByAmount(activePageNumber)),
                takeUntil(this.destroy$)
            ).subscribe((context) => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context)
            })
    }

    private getItemsByAmount(activePageNumber: number): IPaginationContext<T> {
        let appPaginationOf = this.appPaginationOf as T[];
        const startIndex = this.startIndexShowItems(activePageNumber);
        const endIndex = startIndex + this.appPaginationItemsPerPage;
        appPaginationOf = appPaginationOf.slice(
            startIndex,
            endIndex
        );
        this.calcAmountPages();

        return {
            $implicit: appPaginationOf,
            appPaginationOf,
            pages: this.pagesAmount,
            activePage: this.activePage$.value,
            next: this.nextPage.bind(this),
            prev: this.prevPage.bind(this)
        }
    }

    private startIndexShowItems(activePageNumber: number): number {
        if (this.appPaginationOf?.length) {
            return (this.appPaginationItemsPerPage * activePageNumber) - this.appPaginationItemsPerPage;
        }
        return 1;
    }

    private calcAmountPages(): void {
        if (this.appPaginationOf?.length) {
            const pagesAmount = Math.ceil(this.appPaginationOf.length / this.appPaginationItemsPerPage);

            for(let i = 1; i <= pagesAmount; i++) {
                this.pagesAmount.add(i)
            }
        } else {
            this.pagesAmount = new Set([]);
        }
    }

    private nextPage() {
        if ((this.activePage$.value + 1) <= this.pagesAmount.size) {
            this.activePage$.next(this.activePage$.value + 1);
        } else {
            this.activePage$.next(this.pagesAmount.size)
        }
    }

    private prevPage() {
        if ((this.activePage$.value - 1) > 1) {
            this.activePage$.next(this.activePage$.value - 1);
        } else {
            this.activePage$.next(1);
        }
    }
}
