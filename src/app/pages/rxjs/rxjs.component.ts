import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public suscription: Subscription;

  constructor() {

    this.suscription = this.regresaObservable()
    .subscribe(
      numero => {console.log('Subs', numero); },
      error => console.error('Error', error),
      () => console.log('El observador termino')
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval( () => {
          contador ++;

          const salida = {
            valor: contador
          };

          observer.next(salida);

          // if (contador === 3) {
          //   clearInterval(intervalo);
          //   observer.complete();
          // }

          // if (contador === 2) {
          //   // clearInterval(intervalo);
          //   observer.error('auxiñio');
          // }
      }, 1000 );
    }).pipe(
      map( resp => resp.valor ),
      filter ( (valor, index) => {
        // console.log(valor, index);

        if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      } )
    );

  }

}
