import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReadMessageModule { }
