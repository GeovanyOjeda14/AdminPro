import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

// declare function  init_plugins();

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public recuerdame = false;
  public email: string;
  public auth2: any;

  constructor(public router: Router,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length >= 1) {
         this.recuerdame = true;
    }

    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '484714934831-cgr81p76bqhjp7cspalm7n3idfleetoi.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSingin( document.getElementById('btn-google'));
    });
  }

  attachSingin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
        let profile = googleUser.getBasicProfile();

        let token = googleUser.getAuthResponse().id_token;
        console.log(token);

        this.usuarioService.loginGoogle(token).subscribe( () => window.location.href = '#/dashboard' );
    });
  }


  ingresar( forma: NgForm ) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario( null, forma.value.email, forma.value.password );
    this.usuarioService.login(usuario, forma.value.recuerdame).subscribe( () => this.router.navigate(['dashboard']) );
    // console.log(forma);
    // console.log(forma.valid);
    // console.log(forma.value);
    // this.router.navigate(['/dashboard']);
  }

}
