import { StatePanelModule } from '../state-panel/state-panel.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CcpComponent } from "./ccp.component";
import { TopPanelModule } from "../top-panel/top-panel.module";
import { ActionsPanelModule } from '../actions-panel/actions-panel.module';
import { BottomButtonsPanelModule } from '../bottom-buttons-panel/bottom-buttons-panel.module';
import { NumberDialerModule } from '../number-dialer/number-dialer.module';
import { QuickConnectsModule } from '../quick-connects/quick-connects.module';
import { AlertDialogModule } from '../alert-dialog/alert-dialog.module';
import { SettingsMenuModule } from '../settings-menu/settings-menu.module';

@NgModule({
  imports: [
    CommonModule,
    TopPanelModule,
    StatePanelModule,
    ActionsPanelModule,
    BottomButtonsPanelModule,
    NumberDialerModule,
    QuickConnectsModule,
    AlertDialogModule,
    SettingsMenuModule
  ],
  declarations: [CcpComponent],
  exports: [CcpComponent]
})
export class CcpModule { }
