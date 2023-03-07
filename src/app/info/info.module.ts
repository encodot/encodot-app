import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
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
