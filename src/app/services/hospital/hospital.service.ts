import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  public totalHospitales: number = 0;

  constructor(public http: HttpClient,
              public usuarioService: UsuarioService) { }

  cargarHospitales() {
    return this.http.get(URL_SERVICIOS + '/hospital')
                    .map( (resp: any) => {
                      // console.log(resp);
                      this.totalHospitales = resp.total;
                      return resp.hospital;
                    }
                     );
  }

  obtenerHospital(idHospital: string) {
      return this.http.get(URL_SERVICIOS + '/hospital/' + idHospital )
                      .map( (resp: any) => resp.hospital );
  }

  borrarHospital(idHospital: string) {

      return this.http.delete(URL_SERVICIOS + '/hospital/' + idHospital + '?token=' + this.usuarioService.token)
                      .map( resp => {
                                     swal('Hospital borrado', 'Eliminado correctamente', 'success');
                                     return resp;
                                    });
  }

  crearHospital(nombre) {

    return this.http.post(URL_SERVICIOS + '/hospital/' + '?token=' + this.usuarioService.token, {nombre})
                    .map( (resp: any) => resp.hospital );
  }

  buscarHospital(termino: string) {

    return this.http.get(URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino)
                    .map( (resp: any) => resp.hospitales );
  }

  actualizarHospital(hospital: Hospital) {

    return this.http.put(URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.usuarioService.token, hospital)
                    .map( (resp: any) => {
                      swal('Hospital Actualizado', hospital.nombre, 'success');
                      return resp.hospital;
                    } );

  }
}
