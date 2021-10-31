import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
