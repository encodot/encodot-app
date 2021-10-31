import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
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
