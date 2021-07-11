import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'quran/read/:id',
    loadChildren: () => import('./quran/read/read.module').then( m => m.ReadPageModule)
  },
  {
    path: 'quran/read/:id/:ayah',
    loadChildren: () => import('./quran/read/read.module').then( m => m.ReadPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
