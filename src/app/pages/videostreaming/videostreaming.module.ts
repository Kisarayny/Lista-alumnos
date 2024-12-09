import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VideoStreamingPage } from './videostreaming.page';
import { VideoStreamingPageRoutingModule } from './videostreaming-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoStreamingPageRoutingModule,
  ],
  declarations: [VideoStreamingPage],
})
export class VideoStreamingPageModule {}
