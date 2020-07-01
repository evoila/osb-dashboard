import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

export type LoaderColor = 'black' | 'white';
@Directive({
  selector: '[mstInlineLoader]'
})
export class InlineLoaderDirective {

  private child: any;

  @Input()
  public loaderColor: LoaderColor = 'white';

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) { }

  @Input()
  public set mstInlineLoader(value: boolean) {
    if (value) {
      this.child = this.child || this.createChild();
      // this.renderer.invokeElementMethod(this.el.nativeElement, 'insertBefore', [this.child, this.el.nativeElement.firstChild]);
      this.renderer.insertBefore(this.el.nativeElement, this.child, this.el.nativeElement.firstChild)
    } else if (this.child) {
      //this.renderer.invokeElementMethod(this.el.nativeElement, 'removeChild', [this.child]);
      this.renderer.removeChild(this.el.nativeElement, this.child);
    }
  }

  private createChild() {

    const c = this.renderer.appendChild(null, this.renderer.createElement('span')); // need to use span as div is illegal, e.g. in buttons
    this.renderer.addClass(c, 'loader');
    this.renderer.addClass(c, 'loader-inline');

    if (this.loaderColor === 'white') {
      this.renderer.addClass(c, 'loader-white');
    }
    return c;
  }
}

