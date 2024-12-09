import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GrabarvideoPageRoutingModule } from './grabarvideo-routing.module';
import { GrabarvideoPage } from './grabarvideo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrabarvideoPageRoutingModule
  ],
  declarations: [GrabarvideoPage]
})
export class GrabarvideoPageModule {}
