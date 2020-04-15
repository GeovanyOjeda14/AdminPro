import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

// Rutas
import { PagesRoutesModule } from './pages-routes.module';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

// ng2-chars
import { ChartsModule } from 'ng2-charts';
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficaDonaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PagesRoutesModule,
    ChartsModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    GraficaDonaComponent
  ]
})
export class PagesModule { }
