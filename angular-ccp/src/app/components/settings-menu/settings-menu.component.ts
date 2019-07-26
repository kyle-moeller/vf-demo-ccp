import { Component, OnInit } from "@angular/core";
import { AmazonconnectService } from "src/app/services/amazonconnect.service";
import { Country } from "src/app/models/country";
import { ParameterizedPhoneNumber } from "src/app/models/parameterized-phone-number";
import { UiManagementService } from "src/app/services/ui-management.service";
import PhoneNumber from "awesome-phonenumber";

@Component({
  selector: "app-settings-menu",
  templateUrl: "./settings-menu.component.html",
  styleUrls: ["./settings-menu.component.scss"]
})
export class SettingsMenuComponent implements OnInit {
  softphone: boolean;

  phoneNumber: ParameterizedPhoneNumber;

  isPhoneNumberValid: boolean;

  constructor(
    private amazonConnectService: AmazonconnectService,
    private uiManagementService: UiManagementService
  ) {}

  ngOnInit() {
    this.softphone = this.amazonConnectService.isSoftphone();

    this.phoneNumber = this.amazonConnectService.getAgentDeskPhoneNumberAndCountry();

    this.isPhoneNumberValid = new PhoneNumber(
      this.phoneNumber.phoneNumber,
      this.phoneNumber.country.isoCode
    ).isValid();
  }

  setSelectedCountry(country: Country) {
    this.phoneNumber.country = country;
    this.isPhoneNumberValid = new PhoneNumber(
      this.phoneNumber.phoneNumber,
      this.phoneNumber.country.isoCode
    ).isValid();
  }

  setSoftphone(softphone: boolean) {
    this.softphone = softphone;

    //Escape if the user tries to set to desk phone mode with invalid/incomplete number, they'll need to use save button first time
    if (!softphone && !this.isPhoneNumberValid) {
      return;
    }

    this.amazonConnectService.updateAgentConfiguration(softphone);
  }

  validatePhone(event) {
    let pn = new PhoneNumber(event, this.phoneNumber.country.isoCode);
    this.isPhoneNumberValid = pn.isValid();
  }

  close() {
    this.uiManagementService.toggleSettingsMenu();
  }

  updateAgentExtension() {
    this.amazonConnectService.updateAgentConfiguration(false, this.phoneNumber);
  }

  downloadAgentLogs() {
    this.amazonConnectService.downloadAgentLogs();
  }
}
