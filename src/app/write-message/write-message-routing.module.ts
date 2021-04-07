import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteMessageComponent } from './write-message.component';

const routes: Routes = [
  { path: '', component: WriteMessageComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WriteMessageRoutingModule {}
