import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ElementosComponent} from './components/elementos/elementos.component'
import{ElementosListComponent} from './components/elementos/elementos-list/elementos-list.component'


const routes: Routes = [
  {
    path:'elementos/add',
    component:ElementosComponent
  },
  {
    path:'elementos/list',
    component:ElementosListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
