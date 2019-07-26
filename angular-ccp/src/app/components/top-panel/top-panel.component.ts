import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { AmazonconnectService } from 'src/app/services/amazonconnect.service';
import { UiManagementService } from 'src/app/services/ui-management.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-top-panel",
  templateUrl: "./top-panel.component.html",
  styleUrls: ["./top-panel.component.scss"]
})
export class TopPanelComponent implements OnInit {
  @Input()
  availableAgentStates: any[];

  @Input()
  agentStatus: any;

  dropdownToggled: boolean;

  agentUserName: string;

  busyStates = ['Busy', 'CallingCustomer', 'PendingBusy', 'Pending'];

  constructor(private amazonConnectService: AmazonconnectService, private uiManagementService: UiManagementService) { }

  ngOnInit() {
    this.dropdownToggled = false;
  }

  getBackgroundColorClass() {
    if (this.dropdownToggled) {
      return "color-dropdown";
    }

    let ccpState = this.amazonConnectService.getCCPState();

    if (
      ccpState === "hold" ||
      ccpState === "transfer-2" ||
      ccpState === "transfer-hold" ||
      ccpState === "transfer-connecting" ||
      ccpState === "third-party-hold"
    ) {
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
        this.agentStatus.type === "not_routable" ||
        this.agentStatus.name === "Offline" ||
        this.agentStatus.name === "AfterCallWork"
      ) {
        return "color-unavailable";
      } else {
        return "color-error";
      }
    }
  }

  toggleDropdown() {
    if (!this.isAgentBusy()) {
      this.agentUserName = this.amazonConnectService.getAgentUserName();
      this.dropdownToggled = !this.dropdownToggled;
    }
  }

  changeAgentState(state) {
    this.amazonConnectService.setAgentStatus(state.name);
    this.toggleDropdown();
  }

  isAgentBusy(): boolean {
    if (this.agentStatus) {
      return _.includes(this.busyStates, this.agentStatus.name);
    }

    return false;
  }

  toggleSettingsMenu() {
    this.uiManagementService.toggleSettingsMenu();
  }

  logout() {
    if (confirm("Are you sure you want to log out?")) {
      this.amazonConnectService.setAgentStatus("Offline");
      window.location.href = environment.ccpLogoutUrl;
    }
  }
}
