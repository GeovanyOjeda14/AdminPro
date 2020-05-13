import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public token: string;

  constructor(public http: HttpClient,
              public router: Router,
              public subirArchivo: SubirArchivoService) {
    this.cargarStorage();
   }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify( usuario ));

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(URL_SERVICIOS + '/usuario', usuario)
                    .map( (res: any) => {
                      swal('Usuario creado', usuario.email, 'success');
                      return res.usuario;
                    } );
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(URL_SERVICIOS + '/login', usuario)
                    .map( (res: any) => {
                      this.guardarStorage(res.id, res.token, res.usuario);
                      return true;
                    });
  }

  logout() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post( URL_SERVICIOS + '/login/google', {token} )
                    .map( (res: any) => {
                     this.guardarStorage(res.id, res.token, res.usuario);
                     return true;
    } );
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token, usuario)
                    .map( (res: any) => {


                      if ( usuario._id === this.usuario._id) {
                        let usuarioDb : Usuario = res.usuario;
                        this.guardarStorage(usuarioDb._id, this.token, usuarioDb );
                      }
                      swal('Usuario actualizado', usuario.nombre, 'success');
                      return true;
                    } );
  }


  cambiarImagen(archivo: File, id: string) {

    this.subirArchivo.subirArchivo(archivo, 'usuarios', id).then( (resp: any) => {
        console.log(resp);
        this.usuario.img = resp.usuarioActualizado.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
    }).catch( resp => {
        console.log(resp);
    });
  }

  cargarUsuarios(desde: number = 0) {
    return this.http.get(URL_SERVICIOS + '/usuario?desde=' + desde);
  }

  buscarUsuarios(termino: string) {

    return this.http.get(URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino)
                    .map( (resp: any) => resp.usuarios );

  }

  borraUsuario( id: string ) {
    return this.http.delete( URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token )
                    .map( resp => {
                      swal('Usuario borrado', 'Usuario eliminado correctamente', 'success');
                      return true;
                    } );
  }

}
