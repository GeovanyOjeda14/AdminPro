import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public token: string;
  public menu: any[] = [];

  constructor(public http: HttpClient,
              public router: Router,
              public subirArchivo: SubirArchivoService) {
    this.cargarStorage();
   }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify( usuario ));
    localStorage.setItem('menu', JSON.stringify( menu ));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(URL_SERVICIOS + '/usuario', usuario)
                    .map( (res: any) => {
                      swal('Usuario creado', usuario.email, 'success');
                      return res.usuario;
                    } )
                    .catch( err => {
                      swal(err.error.mensaje, err.error.errors.message, 'error');
                      // tslint:disable-next-line: deprecation
                      return Observable.throw(err);
                    });
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(URL_SERVICIOS + '/login', usuario)
                    .map( (res: any) => {
                      this.guardarStorage(res.id, res.token, res.usuario, res.menu);
                      return true;
                    })
                    .catch( err => {
                      swal('Error en el login', err.error.mensaje, 'error');
                      // tslint:disable-next-line: deprecation
                      return Observable.throw(err);
                    });
  }

  logout() {
    this.token = '';
    this.usuario = null;
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post( URL_SERVICIOS + '/login/google', {token} )
                    .map( (res: any) => {
                    //  console.log(res);
                     this.guardarStorage(res.id, res.token, res.usuario, res.menu);
                     return true;
    } );
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token, usuario)
                    .map( (res: any) => {


                      if ( usuario._id === this.usuario._id) {
                        let usuarioDb : Usuario = res.usuario;
                        this.guardarStorage(usuarioDb._id, this.token, usuarioDb, res.menu );
                      }
                      swal('Usuario actualizado', usuario.nombre, 'success');
                      return true;
                    } )
                    .catch( err => {
                      swal(err.error.mensaje, err.error.errors.message, 'error');
                      // tslint:disable-next-line: deprecation
                      return Observable.throw(err);
                    });
  }


  cambiarImagen(archivo: File, id: string) {

    this.subirArchivo.subirArchivo(archivo, 'usuarios', id).then( (resp: any) => {
        console.log(resp);
        this.usuario.img = resp.usuarioActualizado.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
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
