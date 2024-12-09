import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrabarvideoPage } from './grabarvideo.page';

const routes: Routes = [
  {
    path: '',
    component: GrabarvideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrabarvideoPageRoutingModule {}
