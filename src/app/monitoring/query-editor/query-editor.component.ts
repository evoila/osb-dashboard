import { Component, OnInit } from '@angular/core';
import { CatalogueService, ChartCatalogue } from '../catalogue.service';

@Component({
  selector: 'sb-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss']
})
export class QueryEditorComponent implements OnInit {

  public catalogues: ChartCatalogue;
  constructor(private catalogue: CatalogueService) { }

  ngOnInit() {
    this.catalogue.getCatalogue().subscribe(data => {
      this.catalogues = data;
      console.log(data);
    });
  }

}
