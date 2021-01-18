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
      this.el.nativeElement.insertBefore(this.child, this.el.nativeElement.firstChild);
    } else if (this.child) {
      this.el.nativeElement.removeChild(this.child);
    }
  }

  private createChild() {
    const c = __ngRendererCreateElementHelper(this.renderer, null, 'span'); // need to use span as div is illegal, e.g. in buttons
    this.renderer.addClass(c, 'loader');
    this.renderer.addClass(c, 'loader-inline');

    if (this.loaderColor === 'white') {
      this.renderer.addClass(c, 'loader-white');
    }
    return c;
  }
}


type AnyDuringRendererMigration = any;

function __ngRendererSplitNamespaceHelper(name: AnyDuringRendererMigration) {
    if (name[0] === ":") {
        const match = name.match(/^:([^:]+):(.+)$/);
        return [match[1], match[2]];
    }
    return ["", name];
}

function __ngRendererCreateElementHelper(renderer: AnyDuringRendererMigration, parent: AnyDuringRendererMigration, namespaceAndName: AnyDuringRendererMigration) {
    const [namespace, name] = __ngRendererSplitNamespaceHelper(namespaceAndName);
    const node = renderer.createElement(name, namespace);
    if (parent) {
        renderer.appendChild(parent, node);
    }
    return node;
}
