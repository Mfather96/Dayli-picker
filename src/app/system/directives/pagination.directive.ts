import {ChangeDetectorRef, Directive, inject, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef} from "@angular/core";
import { AbstractDirective } from "./abstract.directive";
import { BehaviorSubject, map, takeUntil } from "rxjs";
import { IPaginationContext } from "../interfaces/interface";

@Directive({
    selector: '[appPagination]',
    standalone: true,
})
export class PaginationDirective<T> extends AbstractDirective implements OnInit, OnChanges {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationItemsPerPage: number = 10;

    protected items$ = new BehaviorSubject<T[] | undefined | null>(null)
    protected activePage$ = new BehaviorSubject<number>(1);
    protected pagesAmount: Set<number> = new Set([]);

    private readonly cdr = inject(ChangeDetectorRef);

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<IPaginationContext<T>>,
    ) {
        super()
    }

    ngOnChanges({appPaginationOf}: SimpleChanges): void {
        if (appPaginationOf) {
            this.updateView();            
        }
    }

    ngOnInit(): void {
        this.calcAmountPages();

        this.listenAmountItems();
    }

    private updateView() {
        if (this.appPaginationOf?.length) {
            this.activePage$.next(1);
            return;
        }

        this.viewContainerRef.clear();
    }

    private listenAmountItems() {
        this.activePage$
            .pipe(
                map((activePageNumber) => this.getItemsByAmount(activePageNumber)),
                takeUntil(this.destroy$)
            ).subscribe((context) => {
                console.log(context);
                
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
                this.cdr.markForCheck();
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
