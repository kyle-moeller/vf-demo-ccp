import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryCodeSelectComponent } from './country-code-select.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CountryCodeSelectComponent],
  exports: [CountryCodeSelectComponent]
})
export class CountryCodeSelectModule { }
