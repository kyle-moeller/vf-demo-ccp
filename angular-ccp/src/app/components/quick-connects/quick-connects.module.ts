import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuickConnectsComponent } from "./quick-connects.component";
import { FormsModule } from "@angular/forms";
import { QuickConnectFilterModule } from "src/app/pipes/quick-connect-filter.module";

@NgModule({
  imports: [CommonModule, FormsModule, QuickConnectFilterModule],
  declarations: [QuickConnectsComponent],
  exports: [QuickConnectsComponent]
})
export class QuickConnectsModule {}
