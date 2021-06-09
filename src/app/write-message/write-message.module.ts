import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EncodotApiModule } from '@shared/encodot-api';
import { ProgressOverlayModule } from '@shared/progress-overlay';
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
    ProgressOverlayModule,
    ErrorCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WriteMessageModule { }
