import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor: number) {

    if (this.porcentaje >= 100 && valor > 0) {
      return;
    }

    if (this.porcentaje <= 0 && valor < 0) {
      return;
    }

    this.porcentaje = this.porcentaje + valor;

    this.cambioValor.emit(this.porcentaje);
  }

  onChanges(newValue: number) {

    let elementHTM: any = document.getElementsByName('porcentaje')[0];

    // console.log(elementHTM.value);
    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    elementHTM.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }

}
