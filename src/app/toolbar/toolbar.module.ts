import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
