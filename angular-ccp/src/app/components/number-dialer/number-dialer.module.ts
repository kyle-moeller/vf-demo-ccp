import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule }   from '@angular/forms';
import { NumberDialerComponent } from "./number-dialer.component";
import { CountryCodeSelectModule } from "../country-code-select/country-code-select.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CountryCodeSelectModule
  ],
  declarations: [NumberDialerComponent],
  exports: [NumberDialerComponent]
})
export class NumberDialerModule {}
