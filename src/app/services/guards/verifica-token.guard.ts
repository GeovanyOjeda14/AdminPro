import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {


  constructor(public usuarioService: UsuarioService,
              public router: Router) {

  }

  canActivate(): Promise<boolean> | boolean {
    // console.log('iniciio de verifica token guard');
    let token = this.usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1] ) );


    let expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['login']);
      return false;
    }
    // console.log(payload);
    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva( fechaExpiracion: number ): Promise<boolean> {

    return new Promise( (resolve, reject) => {
      let tokenExp = new Date( fechaExpiracion * 1000 );
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000) );

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renuevaToken().subscribe( () => {
          resolve(true);
        }, () => {
            reject(false);
        });
      }

      resolve(true);
    } );

  }

  expirado(fechaExpiracion: number) {

    let hora = new Date().getTime() / 1000;

    if (fechaExpiracion < hora) {
      return true;
    } else {
      return false;
    }
    
  }

}
