import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EncodotApiService } from './encodot-api.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    EncodotApiService
  ]
})
export class EncodotApiModule {}
