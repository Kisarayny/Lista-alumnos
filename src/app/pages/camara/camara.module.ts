import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamaraPageRoutingModule } from './camara-routing.module';

import { CamaraPage } from './camara.page';
import {ModalCamaraComponent} from "../../components/modal-camara/modal-camara.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamaraPageRoutingModule
  ],
  declarations: [CamaraPage, ModalCamaraComponent]
})
export class CamaraPageModule {}
