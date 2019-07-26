import { Component, OnInit } from "@angular/core";
import { UiManagementService } from "src/app/services/ui-management.service";
import { AmazonconnectService } from "src/app/services/amazonconnect.service";
import { environment } from "src/environments/environment";
import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import * as _ from "lodash";
import { Country } from "src/app/models/country";

@Component({
  selector: "app-number-dialer",
  templateUrl: "./number-dialer.component.html",
  styleUrls: ["./number-dialer.component.scss"]
})
export class NumberDialerComponent implements OnInit {
  phoneNumber: string = "";

  selectedCountry: Country;

  constructor(
    private uiManagementService: UiManagementService,
    private amazonConnectService: AmazonconnectService
  ) {}

  ngOnInit() {
  }

  close() {
    this.uiManagementService.toggleNumberDialer();
  }

  dialNumber() {
    if (this.amazonConnectService.getAgentStatus().name === "Busy") {
      this.amazonConnectService.transferCall(
        this.amazonConnectService.convertPhoneNumberToEndpoint(
          this.selectedCountry.code + this.phoneNumber
        )
      );
    } else {
      this.amazonConnectService.placeCall(
        this.selectedCountry.code + this.phoneNumber
      );
    }

    this.close();
  }

  sendDigitOnKeyboardInput(event) {
    if (event.length > this.phoneNumber.length) {
      let numberToSend = event.replace(this.phoneNumber, "");

      this.amazonConnectService.sendDigit(numberToSend);
    }
  }

  addNumber(num: string) {
    let dialSound = new Audio("../../../assets/beep.mp3");
    dialSound.play();

    this.amazonConnectService.sendDigit(num);
    this.phoneNumber += num;
  }

  setSelectedCountry(country: Country) {
    this.selectedCountry = country;
  }
}
