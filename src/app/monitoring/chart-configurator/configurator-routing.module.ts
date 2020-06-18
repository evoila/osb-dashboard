import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { OptionsComponent } from 'app/monitoring/chart-configurator/containers/options/options.component';
import { RouterModule } from '@angular/router';
import { SingleViewEditorComponent } from './containers/single-view-editor/single-view-editor.component';

const routes: Routes = [
  {
    path: '',
    component: SingleViewEditorComponent
  },
  {
    path: 'options/:id',
    component: OptionsComponent
  }
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguratorRoutingModule { }
