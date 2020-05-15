import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubirArchivoService } from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './service.index';
import { MedicoService } from './service.index';
import { AdminGuard } from './guards/admin.guard';
import { VerificaTokenGuard } from './guards/verifica-token.guard';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [

    // GUARDS
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,

    // SERVICIOS
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
    declarations: [
    ]
})
export class ServiceModule { }
