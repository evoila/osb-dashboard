import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

@Component({
  selector: 'sb-log-filter',
  templateUrl: './log-filter.component.html',
  styleUrls: ['./log-filter.component.scss']
})
export class LogFilterComponent implements OnInit {
  public filter: Array<[string, string]>
  public topics: Array<string>
  public value: string;
  public key: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  save() {
    const filter: [string, string] = [this.key, this.value];
    if (this.filter) {
      this.filter = [...this.filter, filter];
    } else {
      this.filter = [filter];
    }
  }
  addFilter(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }
}
