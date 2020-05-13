import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medico: Medico = new Medico ('', '', '', '', '');
  public hospital: Hospital = new Hospital('');

  constructor(public hospitalService: HospitalService,
              public medicoService: MedicoService,
              public router: Router,
              public activateRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService) {
                activateRoute.params.subscribe( params => {
                  let id = params['id'];

                  if ( id !== 'nuevo' ) {
                    this.cargarMedico(id);
                  }
                } );
               }

  ngOnInit() {
    this.hospitalService.cargarHospitales().subscribe( hospitales => this.hospitales = hospitales );
    this.modalUploadService.notificacion.subscribe( resp => {
      this.medico.img = resp.medico.img;
    } );
  }


  guardarMedico(f: NgForm) {

    if (f.invalid) {
      return;
    }

    this.medicoService.guardarMedico(this.medico).subscribe( medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    } );
  }

  cambioHospital(idHospital: string) {
    this.hospitalService.obtenerHospital(idHospital).subscribe( hospital => this.hospital = hospital);
  }

  cargarMedico(idMedico: string) {
    this.medicoService.cargarMedico(idMedico).subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    } );
  }

  cambiarFoto() {
    this.modalUploadService.mostratModal('medicos', this.medico._id);
  }

}
