import {Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef} from "@angular/core";
import {BehaviorSubject, filter, map, Subject, takeUntil} from "rxjs";
import {ICarouselContext} from "../interfaces/interface";

@Directive({
    selector: '[appCarousel]',
    standalone: true,
})
export class CarouselDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appCarouselOf: T[] | null | undefined;
    @Input() appCarouselCustomIndex: number | undefined;

    private currentIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(this.customCurrentIndex);
    private destroy$: Subject<void> = new Subject<void>();

    get customCurrentIndex(): number {
        return this.appCarouselCustomIndex ? this.appCarouselCustomIndex : 0
    }

    get shouldShowItems(): boolean {
        return Boolean(this.appCarouselOf?.length);
    }

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<ICarouselContext<T>>
    ) {}

    ngOnChanges({appCarouselOf, appCarouselCustomIndex}: SimpleChanges): void {
        if (appCarouselOf) {
            this.updateView();
        }

        if (appCarouselCustomIndex) {
            console.log(this.customCurrentIndex);

            this.currentIndex$.next(this.customCurrentIndex)
        }
    }

    ngOnInit(): void {
        this.listenCurrentIndex();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView() {
        if (this.shouldShowItems) {
            this.currentIndex$.next(0);
            return;
        }

        this.viewContainerRef.clear();
    }

    private listenCurrentIndex() {
        this.currentIndex$
            .pipe(
                filter(() => this.shouldShowItems),
                map((index: number) => this.getCurrentContext(index)),
                takeUntil(this.destroy$)
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context)
            })
    }

    private getCurrentContext(index: number): ICarouselContext<T> {
        const appCarouselOf = this.appCarouselOf as T[];

        return {
            $implicit: appCarouselOf[index],
            appCarouselOf: appCarouselOf,
            next: this.stepNext.bind(this),
            prev: this.stepPrev.bind(this),
        }
    }

    private stepNext() {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.appCarouselOf!.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private stepPrev() {
        const prevIndex = this.currentIndex$.value - 1;
        const lastIndex = this.appCarouselOf!.length - 1;
        const newIndex = prevIndex < 0 ? lastIndex : prevIndex;

        this.currentIndex$.next(newIndex)
    }
}
