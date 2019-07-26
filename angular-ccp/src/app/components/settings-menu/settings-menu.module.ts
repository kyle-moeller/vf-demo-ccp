import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsMenuComponent } from './settings-menu.component';
import { FormsModule } from '@angular/forms';
import { CountryCodeSelectModule } from '../country-code-select/country-code-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CountryCodeSelectModule
  ],
  declarations: [SettingsMenuComponent],
  exports: [SettingsMenuComponent]
})
export class SettingsMenuModule { }
