import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[tkFlexGrow]'
})
export class FlexGrowDirective implements OnInit {
    @Input('tkFlexGrow') size = 1;

    constructor(
        private renderer: Renderer2,
        private el: ElementRef
    ) {}

    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, `flex-grow-${this.size}`);
    }
}
