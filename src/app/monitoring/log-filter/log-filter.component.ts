import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { SearchService } from 'app/monitoring/search.service';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';


@Component({
  selector: 'sb-log-filter',
  templateUrl: './log-filter.component.html',
  styleUrls: ['./log-filter.component.scss']
})
export class LogFilterComponent implements OnInit {
  @Output('update')
  update = new EventEmitter<Array<[string, string]>>();
  public filters: Array<[string, string]> = [];
  public topics: Array<string> = [];
  public topic: string;
  public value: string;
  private modal: NgbModalRef | null = null;


  constructor(private modalService: NgbModal,
    private searchService: SearchService,
  ) { }

  ngOnInit() {
    this.getTopics();
  }
  save() {
    if (this.topic && this.value) {
      const filter: [string, string] = [this.topic, this.value];
      if (this.filters) {
        this.filters = [...this.filters, filter];
      } else {
        this.filters = [filter];
      }

      this.emitChanges();
      this.modal!!.close();

    }
    this.topic = '';
    this.value = '';

  }
  delete(filter: [string, string]) {
    this.filters = this.filters.filter(k => k !== filter);
    this.emitChanges();
  }
  addFilter(content) {
    this.modal = this.modalService.open(content, { size: 'lg' });
  }
  emitChanges() {
    this.update.emit(this.filters);
  }
  cancel() {
    this.topic = '';
    this.value = '';
    this.modal!!.close();
  }
  getTopics() {
    this.searchService.getMappings().subscribe(
      data => {
        this.topics = data;
      },
      error => {
        //TODO: Error-Handling here
      }
    );
  }
}
