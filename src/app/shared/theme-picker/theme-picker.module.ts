import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@shared/icon';
import { StyleManagerModule } from '@shared/style-manager';
import { ThemePickerComponent } from './theme-picker.component';
import { ThemeStorageService } from './theme-storage/theme-storage.service';

@NgModule({
  imports: [
    CommonModule,
    StyleManagerModule,
    IconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  exports: [ ThemePickerComponent ],
  declarations: [ ThemePickerComponent ],
  providers: [ ThemeStorageService ]
})
export class ThemePickerModule { }
