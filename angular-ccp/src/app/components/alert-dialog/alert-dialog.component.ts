import { Component, OnInit, Input } from "@angular/core";
import { AmazonconnectService } from "src/app/services/amazonconnect.service";
import { UiManagementService } from "src/app/services/ui-management.service";

@Component({
  selector: "app-alert-dialog",
  templateUrl: "./alert-dialog.component.html",
  styleUrls: ["./alert-dialog.component.scss"]
})
export class AlertDialogComponent implements OnInit {
  @Input()
  alertText: string;

  constructor(private uiManagementService: UiManagementService) {}

  ngOnInit() {
    console.log('alert rendering: ', this.alertText);
  }

  close() {
    this.uiManagementService.toggleAlert();
  }
}
