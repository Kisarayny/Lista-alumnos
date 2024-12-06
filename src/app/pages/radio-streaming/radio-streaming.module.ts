import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RadioStreamingPageRoutingModule } from './radio-streaming-routing.module';

import { RadioStreamingPage } from './radio-streaming.page';
import { ModalRadioStreamingComponent } from "../../components/modal-radio-streaming/modal-radio-streaming.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RadioStreamingPageRoutingModule
  ],
  declarations: [RadioStreamingPage, ModalRadioStreamingComponent]
})
export class RadioStreamingPageModule {}
