import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public token: string;

  constructor(public http: HttpClient,
              public router: Router) {
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
}
