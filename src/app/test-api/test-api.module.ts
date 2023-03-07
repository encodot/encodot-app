import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { EncodotApiModule } from '@shared/encodot-api';
import { IconModule } from '@shared/icon';
import { ErrorCardModule } from '../shared/error-card';
import { TestApiRoutingModule } from './test-api-routing.module';
import { TestApiComponent } from './test-api.component';

@NgModule({
  declarations: [
    TestApiComponent
  ],
  imports: [
    CommonModule,
    TestApiRoutingModule,
    EncodotApiModule,
    ClipboardModule,
    ErrorCardModule,
    IconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TestApiModule { }
