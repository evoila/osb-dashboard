import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { services } from './services';
import { components } from './components';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [...components],
  exports: [...components]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: services
    };
  }
}
