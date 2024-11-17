import {Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
    selector: '[appActiveShadow]',
    standalone: true,
})
export class ActiveShadowDirective {

    @HostListener('click')
    setShadow() {
        this.boxShadow = this.boxShadow ? '' : '0 0 5px 1px red';
    }

    @HostBinding('style.boxShadow') boxShadow = '';
}
