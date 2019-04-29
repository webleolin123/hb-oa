import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[useRender2]'
})
export class UeeRender2Directive implements OnInit {
    // innerHtml:string;
    constructor(private renderer: Renderer2, private el: ElementRef) {}

    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'wild');
        // this.renderer.appendChild(this.el.nativeElement, this.innerHtml);
    }
}
