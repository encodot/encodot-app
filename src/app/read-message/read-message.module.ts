import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProgressOverlayModule } from '../shared/progress-overlay';
import { ReadMessageRequestService } from './read-message-request.service';
import { ReadMessageRoutingModule } from './read-message-routing.module';
import { ReadMessageComponent } from './read-message.component';

@NgModule({
  declarations: [
    ReadMessageComponent
  ],
  imports: [
    CommonModule,
    ReadMessageRoutingModule,
    ProgressOverlayModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ReadMessageRequestService
  ]
})
export class ReadMessageModule { }
