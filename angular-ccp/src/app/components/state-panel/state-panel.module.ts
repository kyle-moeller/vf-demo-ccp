import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StatePanelComponent } from "./state-panel.component";
import { AgentStatusModule } from "src/app/pipes/agent-status.module";
import { MillisToTimeModule } from "src/app/pipes/millis-to-time.module";

@NgModule({
  imports: [CommonModule, AgentStatusModule, MillisToTimeModule],
  declarations: [StatePanelComponent],
  exports: [StatePanelComponent]
})
export class StatePanelModule {}
