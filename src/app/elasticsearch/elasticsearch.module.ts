import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElasticsearchComponent } from './elasticsearch.component';
import { ElasticsearchRoutingModule } from './elasticsearch-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ElasticsearchRoutingModule
  ],
  declarations: [ElasticsearchComponent]
})
export class ElasticsearchModule { }
