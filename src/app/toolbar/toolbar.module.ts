import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { IconModule } from '@shared/icon';
import { ThemePickerModule } from '@shared/theme-picker';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ThemePickerModule,
    IconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
