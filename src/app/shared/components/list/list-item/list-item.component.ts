import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ComponentFactoryResolver
} from '@angular/core';
import { ListItemDirective } from '../directives/list-item.directive';
import { ListItem } from '../interfaces/list-item';

@Component({
  selector: 'sb-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() listItem: ListItem;
  @ViewChild(ListItemDirective, { static: true })
  ListItemDirective: ListItemDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.renderComponent();
  }

  /**
   * Render the listItem dependent on what component it is.
   */
  public renderComponent(): void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        this.listItem.component
      );
    const viewContainerRef = this.ListItemDirective.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.data = this.listItem.data;
  }
}
