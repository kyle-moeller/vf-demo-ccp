import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { AmazonconnectService } from "src/app/services/amazonconnect.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

class Timer {
  time: number = 0;
  state: string;
}

@Component({
  selector: "app-state-panel",
  templateUrl: "./state-panel.component.html",
  styleUrls: ["./state-panel.component.scss"]
})
export class StatePanelComponent implements OnInit {
  @Input()
  agentStatus: any;

  @Input()
  connectAgent: any;

  stateTimer: string;

  initialConnectionTimer: string;

  thirdPartyConnectionTimer: string;

  constructor(private amazonConnectService: AmazonconnectService) {}

  ngOnInit() {
    this.stateTimer = this.amazonConnectService.getCCPStateTimer();
    this.initialConnectionTimer = this.amazonConnectService.getInitialConnectionStateTimer();
    this.thirdPartyConnectionTimer = this.amazonConnectService.getThirdPartyConnectionStateTimer();

    setInterval(() => {
      this.stateTimer = this.amazonConnectService.getCCPStateTimer();
      this.initialConnectionTimer = this.amazonConnectService.getInitialConnectionStateTimer();
      this.thirdPartyConnectionTimer = this.amazonConnectService.getThirdPartyConnectionStateTimer();
    }, 500);
  }

  getBackgroundColorClass() {
    const ccpState = this.amazonConnectService.getCCPState();

    if (ccpState === "hold" || ccpState === "third-party-hold") {
      return "color-hold";
    }

    if (this.agentStatus) {
      if (
        this.agentStatus.name === "Available" ||
        this.agentStatus.name === "CallingCustomer" ||
        this.agentStatus.name === "PendingBusy" ||
        this.agentStatus.name === "Pending"
      ) {
        return "color-available";
      } else if (
        this.agentStatus.name === "MissedCallAgent" ||
        this.agentStatus.name === "Default" ||
        this.agentStatus.name === "FailedConnectCustomer"
      ) {
        return "color-missed-call";
      } else if (this.agentStatus.name === "Busy") {
        return "color-connected";
      } else if (
        this.agentStatus.name === "Offline" ||
        this.agentStatus.name === "AfterCallWork" ||
        this.agentStatus.type === "not_routable" //All custom states
      ) {
        return "color-unavailable";
      } else {
        return "color-error";
      }
    }
  }

  displayTimer() {
    if (this.agentStatus) {
      return (
        this.agentStatus.name === "CallingCustomer" ||
        this.agentStatus.name === "PendingBusy" ||
        this.agentStatus.name === "Pending" ||
        this.agentStatus.name === "AfterCallWork" ||
        this.agentStatus.name === "Busy" ||
        this.agentStatus.type === "not_routable" //All custom states
      );
    }
  }

  displayPhoneNumber(): boolean {
    const ccpState = this.amazonConnectService.getCCPState();

    let phoneNumber =
      ccpState && ccpState.startsWith("third-party")
        ? this.getThirdPartyConnectionNumber()
        : this.getInitialConnectionNumber();

    if (this.agentStatus && phoneNumber && phoneNumber.length > 0) {
      return (
        !phoneNumber.startsWith("sip") &&
        (this.agentStatus.name === "Busy" ||
          this.agentStatus.name === "CallingCustomer" ||
          this.agentStatus.name === "PendingBusy" ||
          this.agentStatus.name === "Pending")
      );
    }

    return false;
  }

  getConnectionStyle(connectionName) {
    let state = this.amazonConnectService.getCCPState();

    if (connectionName === "initial") {
      switch (state) {
        case "transfer-connecting":
          return "color-hold";
        case "transfer-2":
          return "color-hold";
        case "transfer-1":
          return "color-connected";
        case "transfer-hold":
          return "color-hold";
        case "transfer-join":
          return "color-connected";
      }
    } else if (connectionName === "thirdParty") {
      switch (state) {
        case "transfer-connecting":
          return "color-available";
        case "transfer-2":
          return "color-connected";
        case "transfer-1":
          return "color-hold";
        case "transfer-hold":
          return "color-hold";
        case "transfer-join":
          return "color-connected";
      }
    }
  }

  isMultiPartyCall(): boolean {
    let ccpState = this.amazonConnectService.getCCPState();
    if (ccpState) {
      return ccpState.startsWith("transfer");
    } else {
      return false;
    }
  }

  isTransferHold(): boolean {
    return this.amazonConnectService.getCCPState() === "transfer-hold";
  }

  isTransferJoined(): boolean {
    return this.amazonConnectService.getCCPState() === "transfer-join";
  }

  getInitialConnectionState(): string {
    let callState = this.amazonConnectService.getCCPState();

    switch (callState) {
      case "transfer-connecting":
        return "On hold";
      case "transfer-2":
        return "On Hold";
      case "transfer-1":
        return "> Connected";
      case "transfer-hold":
        return "On Hold";
      case "transfer-join":
        return "Joined";
    }
  }

  getThirdPartyConnectionState(): string {
    let callState = this.amazonConnectService.getCCPState();

    switch (callState) {
      case "transfer-connecting":
        return "> Outbound call";
      case "transfer-2":
        return "> Connected";
      case "transfer-1":
        return "On Hold";
      case "transfer-hold":
        return "On Hold";
      case "transfer-join":
        return "Joined";
    }
  }

  getSingleConnectionNumber(): string {
    const ccpState = this.amazonConnectService.getCCPState();

    return ccpState && ccpState.startsWith("third-party")
      ? this.getThirdPartyConnectionNumber()
      : this.getInitialConnectionNumber();
  }

  getInitialConnectionNumber(): string {
    return this.amazonConnectService.getInitialConnectionNumber();
  }

  getThirdPartyConnectionNumber(): string {
    return this.amazonConnectService.getThirdPartyConnectionNumber();
  }

  getInitialConnectionStateTimer(): string {
    return this.amazonConnectService.getInitialConnectionStateTimer();
  }

  getThirdPartyConnectionStateTimer(): string {
    return this.amazonConnectService.getThirdPartyConnectionStateTimer();
  }

  hangUpInitialConnection() {
    this.amazonConnectService.hangUpInitialConnection();
  }

  hangUpThirdPartyConnection() {
    this.amazonConnectService.hangUpThirdPartyConnection();
  }

  resumeInitialConnection() {
    this.amazonConnectService.resumeInitialConnection();
  }

  resumeThirdPartyConnection() {
    this.amazonConnectService.resumeThirdPartyConnection();
  }

  holdInitialConnection() {
    this.amazonConnectService.holdInitialConnection();
  }

  holdThirdPartyConnection() {
    this.amazonConnectService.holdThirdPartyConnection();
  }

  getCallStatusText(): string {
    switch (this.agentStatus.name) {
      case "PendingBusy":
        return "From";
        break;
      case "CallingCustomer":
        return "To";
        break;
      case "Pending":
        return "To";
        break;
      case "Busy":
        return "With";
        break;
    }
  }
}
