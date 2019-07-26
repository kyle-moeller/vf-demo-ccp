import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuickConnectFilterPipe } from "./quick-connect-filter.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [QuickConnectFilterPipe],
  exports: [QuickConnectFilterPipe]
})
export class QuickConnectFilterModule {}
