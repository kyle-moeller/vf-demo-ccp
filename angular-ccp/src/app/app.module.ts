import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActionsPanelModule } from './components/actions-panel/actions-panel.module';
import { AlertDialogModule } from './components/alert-dialog/alert-dialog.module';
import { AppComponent } from './components/app.component';
import { BottomButtonsPanelModule } from './components/bottom-buttons-panel/bottom-buttons-panel.module';
import { CcpModule } from './components/ccp/ccp.module';
import { NumberDialerModule } from './components/number-dialer/number-dialer.module';
import { QuickConnectsModule } from './components/quick-connects/quick-connects.module';
import { StatePanelModule } from './components/state-panel/state-panel.module';
import { TopPanelModule } from './components/top-panel/top-panel.module';
import { AgentStatusModule } from './pipes/agent-status.module';
import { AmazonconnectService } from './services/amazonconnect.service';
import { UiManagementService } from './services/ui-management.service';
import { SettingsMenuModule } from './components/settings-menu/settings-menu.module';
import { CountryCodeSelectModule } from './components/country-code-select/country-code-select.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CcpModule,
    TopPanelModule,
    StatePanelModule,
    ActionsPanelModule,
    BottomButtonsPanelModule,
    AgentStatusModule,
    NumberDialerModule,
    QuickConnectsModule,
    AlertDialogModule,
    SettingsMenuModule,
    CountryCodeSelectModule
  ],
  providers: [
    AmazonconnectService,
    UiManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
