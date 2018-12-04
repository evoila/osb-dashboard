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

  ngOnInit() {
    this.generalService.customLoadAll('backup/' + this.generalService.getServiceInstanceId() + '/items')
      .subscribe(
        (result: any) => { this.itemList = result.content }
      );
  }

}
