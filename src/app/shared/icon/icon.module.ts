import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [
    MatIconModule
  ],
  exports: [
    MatIconModule
  ]
})
export class IconModule {

  public constructor(reg: MatIconRegistry, sanitizer: DomSanitizer) {
    reg.addSvgIcon(
      'theme-demo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/theme-demo.svg')
    );

    reg.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/logo.svg')
    );
  }

}
