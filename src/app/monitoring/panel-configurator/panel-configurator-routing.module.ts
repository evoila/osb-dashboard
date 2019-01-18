import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelEditorComponent } from './container/panel-editor/panel-editor.component';
const routes: Routes = [
  {
    path: '',
    component: PanelEditorComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelConfiguratorRoutingModule {}
