import { Component, OnInit, Input } from "@angular/core";
import { UiManagementService } from "src/app/services/ui-management.service";
import { AmazonconnectService } from "src/app/services/amazonconnect.service";

@Component({
  selector: "app-actions-panel",
  templateUrl: "./actions-panel.component.html",
  styleUrls: ["./actions-panel.component.scss"]
})
export class ActionsPanelComponent implements OnInit {
  @Input()
  agentStatus: any;

  constructor(
    private uiManagementService: UiManagementService,
    private amazonconnectService: AmazonconnectService
  ) {}

  ngOnInit() {}

  displayDialBtns() {
    if (this.agentStatus) {
      return (
        this.agentStatus.name === "Available" ||
        this.agentStatus.name === "Offline" ||
        this.agentStatus.name === "AfterCallWork" ||
        this.agentStatus.name === "MissedCallAgent" ||
        this.agentStatus.name === "Default" ||
        (this.agentStatus.type === "not_routable" &&
          (this.agentStatus.name !== "Pending" && 
          this.agentStatus.name !== "Busy"))
      );
    }
  }

  displayConnectedActions(): boolean {
    return (
      this.agentStatus &&
      this.agentStatus.name === "Busy" &&
      (this.amazonconnectService.getCCPState() === "connected" ||
        this.amazonconnectService.getCCPState() === "hold")
    );
  }

  displayConnectedThirdPartyActions(): boolean {
    return (
      this.agentStatus &&
      this.agentStatus.name === "Busy" &&
      (this.amazonconnectService.getCCPState() === "third-party-connected" ||
        this.amazonconnectService.getCCPState() === "third-party-hold")
    );
  }

  displayTransferActions(): boolean {
    let state = this.amazonconnectService.getCCPState();
    return (
      state === "transfer-connecting" ||
      state === "transfer-1" ||
      state === "transfer-2"
    );
  }

  displayTransferHoldActions() {
    let state = this.amazonconnectService.getCCPState();
    return state === "transfer-hold";
  }

  displayTransferJoinedActions() {
    let state = this.amazonconnectService.getCCPState();
    return state === "transfer-join";
  }

  onHold(): boolean {
    const ccpState = this.amazonconnectService.getCCPState();
    return ccpState === "hold" || ccpState === "third-party-hold";
  }

  openNumberDialer() {
    if (!this.uiManagementService.isNumberDialerOpen()) {
      this.uiManagementService.toggleNumberDialer();
    }
  }

  openQuickConnects() {
    if (!this.uiManagementService.isQuickConnectsOpen()) {
      this.uiManagementService.toggleQuickConnects();
    }
  }

  holdConnection() {
    this.amazonconnectService.holdCall();
  }

  holdThirdPartyConnection() {
    this.amazonconnectService.holdThirdPartyConnection();
  }

  resumeThirdPartyConnection() {
    this.amazonconnectService.resumeThirdPartyConnection();
  }

  muteConnection() {
    this.amazonconnectService.toggleMute();
  }

  toggleActionConnections() {
    this.amazonconnectService.toggleActiveConnections();
  }

  joinConnections() {
    this.amazonconnectService.conferenceConnections();
  }

  holdAllConnections() {
    this.amazonconnectService.holdAllConnections();
  }

  resumeAllConnections() {
    this.amazonconnectService.resumeAllConnections();
  }

  isSoftphone(): boolean {
    return this.amazonconnectService.isSoftphone();
  }
}
