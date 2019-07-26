import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopPanelComponent } from "./top-panel.component";

@NgModule({
  imports: [CommonModule],
  declarations: [TopPanelComponent],
  exports: [TopPanelComponent]
})
export class TopPanelModule {}
