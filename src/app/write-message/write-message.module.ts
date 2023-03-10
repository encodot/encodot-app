import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { EncodotApiModule } from '@shared/encodot-api';
import { IconModule } from '@shared/icon';
import { SpinnerModule } from '@shared/spinner';
import { ErrorCardModule } from '../shared/error-card';
import { WriteMessageRoutingModule } from './write-message-routing.module';
import { WriteMessageComponent } from './write-message.component';

@NgModule({
  declarations: [
    WriteMessageComponent
  ],
  imports: [
    CommonModule,
    WriteMessageRoutingModule,
    EncodotApiModule,
    ClipboardModule,
    ErrorCardModule,
    SpinnerModule,
    IconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WriteMessageModule { }
