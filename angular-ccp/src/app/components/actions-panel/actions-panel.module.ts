import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsPanelComponent } from './actions-panel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ActionsPanelComponent],
  exports: [ActionsPanelComponent]
})
export class ActionsPanelModule { }
