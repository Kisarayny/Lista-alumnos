import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SensoresPageRoutingModule } from './sensores-routing.module';

import { SensoresPage } from './sensores.page';
import { ModalSensorsComponent } from "../../components/modal-sensors/modal-sensors.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SensoresPageRoutingModule
  ],
  declarations: [SensoresPage, ModalSensorsComponent]
})
export class SensoresPageModule {}
