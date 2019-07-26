import { Component, OnInit, Input } from '@angular/core';
import { UiManagementService } from 'src/app/services/ui-management.service';
import { AmazonconnectService } from 'src/app/services/amazonconnect.service';

@Component({
  selector: 'app-quick-connects',
  templateUrl: './quick-connects.component.html',
  styleUrls: ['./quick-connects.component.scss']
})
export class QuickConnectsComponent implements OnInit {

  @Input()
  quickConnects: any;

  searchInput: string;

  constructor(private uiManagementService: UiManagementService, private amazonConnectService: AmazonconnectService) { }

  ngOnInit() {
  }

  close() {
    this.uiManagementService.toggleQuickConnects();
  }

  dialQuickConnect(qc) {
    if (this.amazonConnectService.getAgentStatus().name === 'Busy') {
      this.amazonConnectService.transferCall(qc);
    } else {
      this.amazonConnectService.placeCall(qc.phoneNumber);
    }
    this.close();
  }
}
