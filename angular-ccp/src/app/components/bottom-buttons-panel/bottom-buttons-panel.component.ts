import { Component, OnInit, Input } from "@angular/core";
import { AmazonconnectService } from "src/app/services/amazonconnect.service";

@Component({
  selector: "app-bottom-buttons-panel",
  templateUrl: "./bottom-buttons-panel.component.html",
  styleUrls: ["./bottom-buttons-panel.component.scss"]
})
export class BottomButtonsPanelComponent implements OnInit {
  @Input()
  agentStatus: any;

  constructor(private amazonConnectService: AmazonconnectService) {}

  ngOnInit() {}

  displayAvailableBtn(): boolean {
    if (this.agentStatus) {
      const isError = this.amazonConnectService.agentErrorStates.includes(this.agentStatus.name);

      return (
        isError ||
        this.agentStatus.name === "Offline" ||
        this.agentStatus.name === "AfterCallWork" ||
        this.agentStatus.name === "MissedCallAgent" ||
        this.agentStatus.name === "Default" ||
        (this.agentStatus.type === "not_routable" &&
          (this.agentStatus.name !== "Pending" &&
            this.agentStatus.name !== "Busy")) //All custom states
      );
    }

    return false;
  }

  displayInboundCallBtns(): boolean {
    if (this.agentStatus) {
      return (
        this.agentStatus.name === "PendingBusy" ||
        this.agentStatus.name === "Pending"
      );
    }

    return false;
  }

  displayEndBtn(): boolean {
    if (this.agentStatus) {
      return (
        this.agentStatus.name === "Busy" ||
        this.agentStatus.name === "CallingCustomer"
      );
    }

    return false;
  }

  setStatusAvailable() {
    this.amazonConnectService.setAgentStatus("Available");
  }

  acceptCall() {
    this.amazonConnectService.acceptCall();
  }

  rejectCall() {
    this.amazonConnectService.declineCall();
  }

  endCall() {
    this.amazonConnectService.cancelCall();
  }

  isMultiPartyCall(): boolean {
    let ccpState = this.amazonConnectService.getCCPState();

    if (ccpState) {
      return ccpState.startsWith("transfer");
    } else {
      return false;
    }
  }
}
