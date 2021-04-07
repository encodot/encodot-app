import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'write-message', loadChildren: () => import('./write-message/write-message.module').then(m => m.WriteMessageModule) },
  { path: 'read-message', loadChildren: () => import('./read-message/read-message.module').then(m => m.ReadMessageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
