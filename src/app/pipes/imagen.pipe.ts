import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/imagenes';

    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {

      case 'usuario' :
        url = url + '/usuarios/' + img;
        break;

      case 'medico' :
        url = url + '/medicos/' + img;
        break;

      case 'hospital' :
        url = url + '/hospital/' + img;
        break;

      default:
      console.log('tipo de imagen no existe');
      url = url + '/usuarios/xxx';
    }

    return url;
  }

}