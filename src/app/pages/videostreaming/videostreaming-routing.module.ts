import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoStreamingPage } from './videostreaming.page';

const routes: Routes = [
  {
    path: '',
    component: VideoStreamingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoStreamingPageRoutingModule {}
