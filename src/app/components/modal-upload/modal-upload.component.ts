import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public imagenSubir: File;
  public imagenTem: any;

  constructor(public subirArchivoService: SubirArchivoService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {

  }

  cerrarModal() {
    this.imagenTem = undefined;
    this.imagenSubir = undefined;

    this.modalUploadService.ocultarModal();
  }

  seleccionImagen(archivo: File) {
    // console.log(ev);

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    // console.log(archivo);
    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivos seleccionado no es una imagen', 'warning');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTem = reader.result;
  }

  subirImagen() {
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id).then( resp => {
      // console.log(resp);
      this.modalUploadService.notificacion.emit(resp);
      this.cerrarModal();
    }).catch( resp => {
      console.log('error en la carga');
    });
  }

}
