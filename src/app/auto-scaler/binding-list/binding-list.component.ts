import { Component, OnInit } from '@angular/core';
import { AutoScalerService } from '../auto-scaler.service';

@Component({
  selector: 'sb-binding-list',
  templateUrl: './binding-list.component.html',
  styleUrls: ['./binding-list.component.scss']
})
export class BindingListComponent implements OnInit {
  readonly ENTITY = 'manage';
  bindings: any[] = [];
  
  constructor(readonly asService: AutoScalerService) { }

  ngOnInit() {
    this.asService
      .loadAll(this.ENTITY)
      .subscribe((bindings: any) => {
        this.bindings = bindings.bindings;
      });
  }

}
