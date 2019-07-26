import { Pipe, PipeTransform } from '@angular/core';
import { AmazonconnectService } from '../services/amazonconnect.service';

@Pipe({
  name: 'agentStatusPipe'
})
export class AgentStatusPipe implements PipeTransform {

  constructor(private amazonConnectService: AmazonconnectService) {

  }

  transform(value: any, args?: any): any {
    let statusText = '';

    if(value) {
      switch (value.name) {
        case 'Available':
          statusText = 'Available';
          break;
        case 'CallingCustomer':
          statusText = 'Outbound Call';
          break;
        case 'PendingBusy':
          statusText = 'Inbound Call';
          break;
        case 'Pending':
          statusText = 'Callback Incoming';
          break;
        case 'Offline':
          statusText = 'Offline';
          break;
        case 'AfterCallWork':
          statusText = 'After Call Work';
          break;
        case 'MissedCallAgent':
          statusText = 'Missed Call';
          break;
        case 'Default':
          statusText = 'Missed Call';
          break;
        case 'FailedConnectCustomer':
          statusText = 'Call No Longer Available'
          break;
        case 'Busy':
          let ccpState = this.amazonConnectService.getCCPState(); 
          statusText = (ccpState === 'hold' || ccpState === 'third-party-hold') ? 'On Hold' : 'Connected';
          break;

        default: 
          statusText = value.name;
      }
    }

    return statusText;
  }

}
