import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/shared/backup/domain/pagination';
import { GeneralService } from 'app/shared/general/general.service';

@Component({
  selector: 'sb-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss']
})
export class ManageListComponent implements OnInit {
  pageSizes = [10, 25, 50, 100, 250];
  pagination: Pagination = {
    page: 1,
    collectionSize: 0,
    pageSize: 10,
    maxSize: 5,
    rotate: true,
    boundaryLinks: true
  };
  itemList = [];
  
  constructor(protected readonly generalService: GeneralService) { }

  pageChange(page?: number): void {
    if (page)
      this.pagination.page = page;
    this.loadItems();
  }
  
  updateResponse(page: number, collectionSize: number): void {
    this.pagination.page = (page + 1);
    this.pagination.collectionSize = collectionSize;
  }

  loadItems(): void {
    this.generalService.customLoadAll('backup/' + this.generalService.getServiceInstanceId() + '/items', this.pagination)
    .subscribe((items: any) => {
      this.updateResponse(items.number, items.totalElements);        
        this.itemList = items.content;        
    });
  }

  ngOnInit() {
    this.loadItems();
  }

}
