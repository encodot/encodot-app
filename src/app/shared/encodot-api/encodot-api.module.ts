import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AesModule } from '@shared/aes';
import { EncodotApiService } from './encodot-api.service';

@NgModule({
  imports: [
    HttpClientModule,
    AesModule
  ],
  providers: [
    EncodotApiService
  ]
})
export class EncodotApiModule {}
