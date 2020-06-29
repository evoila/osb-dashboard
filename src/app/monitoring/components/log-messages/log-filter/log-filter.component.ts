import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from 'app/monitoring/shared/services/search.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-log-filter',
  templateUrl: './log-filter.component.html',
  styleUrls: ['./log-filter.component.scss']
})
export class LogFilterComponent implements OnInit {

  @ViewChild('addModal') modalPanel: ElementRef;
  
  @Output('update')
  update = new EventEmitter<Array<[string, string]>>();
  
  public filters: Array<[string, string]> = []; //.
  public topics: Array<string> = [];
  public topic: string;
  public value: string;
  private modal: NgbModalRef | null = null;

  constructor(
    private modalService: NgbModal,
    private searchService: SearchService
  ) {}

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
  addFilter() {
    this.modal = this.modalService.open(this.modalPanel, { size: 'lg' });
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
        // since this is a Log-Specific Feature we alwys want the definition of the log-Type
        this.topics = data['logs'] as string[];
      },
      error => {
        // TODO: Error-Handling here
      }
    );
    
  }
}
