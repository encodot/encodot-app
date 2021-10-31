import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./info/info.module').then(m => m.InfoModule), pathMatch: 'full' },
  { path: 'write-message', loadChildren: () => import('./write-message/write-message.module').then(m => m.WriteMessageModule) },
  { path: 'read-message', loadChildren: () => import('./read-message/read-message.module').then(m => m.ReadMessageModule) },
  { path: 'test-api', loadChildren: () => import('./test-api/test-api.module').then(m => m.TestApiModule) }
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
