import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SbreadcrumbsComponent } from './sbreadcrumbs/sbreadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NopagefoundComponent,
    SbreadcrumbsComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    NopagefoundComponent,
    SbreadcrumbsComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
