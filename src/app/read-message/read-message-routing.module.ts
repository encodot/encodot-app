import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadMessageComponent } from './read-message.component';

const routes: Routes = [
  { path: '', component: ReadMessageComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ReadMessageRoutingModule {}
