import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];

  constructor(public medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService.cargarMedicos().subscribe( medicos => this.medicos = medicos );
  }

  buscarMedico(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.medicoService.buscarMedicos(termino).subscribe( medicos => this.medicos = medicos );
  }

  borrarMedico(medico: Medico) {

    this.medicoService.borraMedico(medico._id).subscribe( () => this.cargarMedicos() );
  }
}
