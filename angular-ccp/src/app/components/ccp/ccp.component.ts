import { AmazonconnectService } from "./../../services/amazonconnect.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UiManagementService } from "src/app/services/ui-management.service";
import { environment } from "src/environments/environment"

@Component({
  selector: "app-ccp",
  templateUrl: "./ccp.component.html",
  styleUrls: ["./ccp.component.scss"]
})
export class CcpComponent implements OnInit {
  connectAgent: any;
  connectContact: any;
  agentStatus: any;
  availableAgentStates: any[];
  quickConnects: any;

  quickConnectsSubscription: Subscription;
  agentSubscription: Subscription;
  agentStatesSubscription: Subscription;
  connectErrorSubscription: Subscription;

  alertText: string = "";

  constructor(
    private amazonConnectService: AmazonconnectService,
    private uiManagementService: UiManagementService
  ) {}

  ngOnInit() {
    this.agentSubscription = this.amazonConnectService.observableAgent.subscribe(
      agent => {
        this.connectAgent = agent;
        if (agent) {
          this.agentStatus = agent.getState();
        }
      }
    );

    this.agentStatesSubscription = this.amazonConnectService.observableAgentStates.subscribe(
      states => {
        this.availableAgentStates = states;
      }
    );

    this.quickConnectsSubscription = this.amazonConnectService.observableAgentEndpoints.subscribe(
      qc => {
        this.quickConnects = qc;
      }
    );

    this.connectErrorSubscription = this.amazonConnectService.connectErrorEvent.subscribe(
      err => {
        this.alertText = err;
        this.uiManagementService.toggleAlert();
      }
    );

    let containerDiv = document.getElementById("containerDiv");
    this.amazonConnectService.initConnect(containerDiv);
  }

  displayMainComponents(): boolean {
    return (
      !this.uiManagementService.isNumberDialerOpen() &&
      !this.uiManagementService.isQuickConnectsOpen() &&
      !this.uiManagementService.isSettingsMenuOpen()
    );
  }

  isNumberDialerOpen(): boolean {
    return this.uiManagementService.isNumberDialerOpen();
  }

  isQuickConnectsOpen(): boolean {
    return this.uiManagementService.isQuickConnectsOpen();
  }

  isAlertDialogOpen(): boolean {
    return this.uiManagementService.isAlertOpen();
  }

  isSettingsMenuOpen(): boolean {
    return this.uiManagementService.isSettingsMenuOpen();
  }

  displayLogoutButton() {
    return this.agentStatus && !(
    this.agentStatus.name === "Busy" ||
    this.agentStatus.name === "CallingCustomer" ||
    this.agentStatus.name === "PendingBusy" ||
    this.agentStatus.name === "Pending"
    )
  }
}
