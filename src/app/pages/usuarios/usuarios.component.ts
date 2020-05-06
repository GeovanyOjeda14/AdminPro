import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public desde: number = 0;
  public totalRegistros: number = 0;
  public cargando: boolean = true;

  constructor(public usuarioService: UsuarioService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe( () => this.cargarUsuarios());
  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde).subscribe( (res: any) => {
      // console.log(res);
      this.totalRegistros = res.total;
      this.usuarios = res.usuarios;
      this.cargando = false;
        } );
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }


    this.usuarioService.buscarUsuarios(termino).subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    } );
  }

  borrarUsuario(usuario: Usuario) {

    if (  usuario._id === this.usuarioService.usuario._id) {
        swal('No puede borrar usuario', 'No se puede borrar asi mismo', 'error');
        return;
    }

    swal({
      title : '¿Estas seguro?',
      text : 'Esta a punto de borrar a ' + usuario.nombre,
      icon : 'warning',
      dangerMode: true
    }).then( borrar => {
      console.log(borrar);

      if (borrar) {
        this.usuarioService.borraUsuario(usuario._id).subscribe( borrado => {
          console.log(borrado);
          this.cargarUsuarios();
        } );
      }
    } );
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(idUsuario: string) {
      this.modalUploadService.mostratModal( 'usuarios', idUsuario );
  }

}
