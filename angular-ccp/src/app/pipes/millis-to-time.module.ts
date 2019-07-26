import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MillisToTimePipe } from './millis-to-time.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MillisToTimePipe],
  exports: [MillisToTimePipe]

})
export class MillisToTimeModule { }
