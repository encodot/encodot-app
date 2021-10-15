import { NgModule } from '@angular/core';
import { Base64Module } from '@shared/base64';
import { AesService } from './aes.service';

@NgModule({
  providers: [
    AesService
  ],
  imports: [
    Base64Module
  ]
})
export class AesModule {}
