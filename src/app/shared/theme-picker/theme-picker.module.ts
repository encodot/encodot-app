import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
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
