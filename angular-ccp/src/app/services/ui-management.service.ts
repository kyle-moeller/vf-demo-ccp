import { Injectable } from '@angular/core';

@Injectable()
export class UiManagementService {

  private numberDialerOpened : boolean  = false;
  private quickConnectsOpened : boolean = false;
  private alertOpened : boolean = false;
  private settingsOpened : boolean = false;

  constructor() { }

  toggleNumberDialer() {
    this.numberDialerOpened = !this.numberDialerOpened;
  }

  isNumberDialerOpen() : boolean {
    return this.numberDialerOpened;
  }

  toggleQuickConnects() {
    this.quickConnectsOpened = !this.quickConnectsOpened;
  }

  isQuickConnectsOpen() : boolean {
    return this.quickConnectsOpened;
  }

  toggleAlert() {
    this.alertOpened = !this.alertOpened;
  }

  isAlertOpen() : boolean {
    return this.alertOpened;
  }

  toggleSettingsMenu() {
    this.numberDialerOpened = false;
    this.quickConnectsOpened = false;
    this.settingsOpened = !this.settingsOpened;
  }

  isSettingsMenuOpen() : boolean {
    return this.settingsOpened;
  }
}
