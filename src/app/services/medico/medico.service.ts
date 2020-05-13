import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public totalMedicos: number = 0;

  constructor(public http: HttpClient,
              public usuarioService: UsuarioService) { }

  cargarMedicos() {
    return this.http.get(URL_SERVICIOS + '/medico')
                    .map( (resp: any) => {
                      this.totalMedicos = resp.total;
                      return resp.medicos;
                    } );
  }

  buscarMedicos(termino: string) {

    return this.http.get(URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino)
                    .map( (resp: any) => resp.medicos );

  }

  borraMedico( idMedico: string ) {
    return this.http.delete( URL_SERVICIOS + '/medico/' + idMedico + '?token=' + this.usuarioService.token )
                    .map( resp => {
                      swal('Medico borrado', 'Medico eliminado correctamente', 'success');
                      return true;
                    } );
  }

  guardarMedico(medico: Medico) {

    if ( medico._id ) {
      // actualizando
      return this.http.put(URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this.usuarioService.token, medico)
                      .map( (resp: any) => {
                        console.log('actualizar medico', resp);
                        swal('Medico actualizado', medico.nombre, 'success');
                        return resp.medico;
                      } );

    } else {
      // creando

      return this.http.post(URL_SERVICIOS + '/medico' + '?token=' + this.usuarioService.token, medico)
                    .map( (res: any) => {
                      console.log(res);
                      swal('Medico creado', medico.nombre , 'success');
                      return res.medicos;
                    });
    }

  }

  cargarMedico(idMedico: string) {
    return this.http.get( URL_SERVICIOS + '/medico/' +  idMedico)
                    .map( (res: any) => res.medico );
  }
}
