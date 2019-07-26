import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgentStatusPipe } from "./agent-status.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [AgentStatusPipe],
  exports: [AgentStatusPipe]
})
export class AgentStatusModule {}
