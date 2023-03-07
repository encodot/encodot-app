import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { IconModule } from '@shared/icon';
import { ErrorCardComponent } from './error-card.component';

@NgModule({
  declarations: [
    ErrorCardComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    MatCardModule
  ],
  exports: [
    ErrorCardComponent
  ]
})
export class ErrorCardModule { }
