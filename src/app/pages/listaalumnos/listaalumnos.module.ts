import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaalumnosPageRoutingModule } from './listaalumnos-routing.module';

import { ListaAlumnosPage } from './listaalumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaalumnosPageRoutingModule
  ],
  declarations: [ListaAlumnosPage]
})
export class ListaalumnosPageModule {}
