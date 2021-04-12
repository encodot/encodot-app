import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressOverlayComponent } from './progress-overlay.component';

@NgModule({
  declarations: [
    ProgressOverlayComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ProgressOverlayComponent
  ]
})
export class ProgressOverlayModule { }
