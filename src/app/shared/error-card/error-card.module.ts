import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ErrorCardComponent } from './error-card.component';

@NgModule({
  declarations: [
    ErrorCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    ErrorCardComponent
  ]
})
export class ErrorCardModule { }
