import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAlumnosPage } from './listaalumnos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAlumnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaalumnosPageRoutingModule {}
