import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ElementosComponent} from './components/elementos/elementos.component'
import{ElementosListComponent} from './components/elementos/elementos-list/elementos-list.component'
import {SalidasListComponent} from './components/salidas/salidas-list/salidas-list.component'
import{SalidasFormComponent} from './components/salidas/salidas-form/salidas-form.component'


const routes: Routes = [
  {
    path:'elementos/add',
    component:ElementosComponent
  },
  {
    path:'elementos/list',
    component:ElementosListComponent
  },
  {
    path:'salidas/list',
    component:SalidasListComponent
  },
  {
    path:'salidas/add/:id',
    component:SalidasFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
