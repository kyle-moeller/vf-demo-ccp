import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertDialogComponent } from "./alert-dialog.component";

@NgModule({
  imports: [CommonModule],
  declarations: [AlertDialogComponent],
  exports: [AlertDialogComponent]
})
export class AlertDialogModule {}
