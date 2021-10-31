import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IconModule } from '@shared/icon';
import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';

@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    IconModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class InfoModule { }
