import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { EncodotApiModule } from '@shared/encodot-api';
import { IconModule } from '@shared/icon';
import { SpinnerModule } from '@shared/spinner';
import { ErrorCardModule } from '../shared/error-card';
import { ReadMessageRoutingModule } from './read-message-routing.module';
import { ReadMessageComponent } from './read-message.component';

@NgModule({
  declarations: [
    ReadMessageComponent
  ],
  imports: [
    CommonModule,
    ReadMessageRoutingModule,
    EncodotApiModule,
    ErrorCardModule,
    SpinnerModule,
    IconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReadMessageModule { }
