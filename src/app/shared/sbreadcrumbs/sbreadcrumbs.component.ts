import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-sbreadcrumbs',
  templateUrl: './sbreadcrumbs.component.html',
  styles: []
})
export class SbreadcrumbsComponent implements OnInit {
  public titulo: string;

  constructor( private router: Router,
               private title: Title,
               private meta: Meta ) {

    this.getDataRoute().subscribe( data => {
      // console.log(ev);
      this.titulo = data.titulo;
      this.title.setTitle( this.titulo );

      const metaTag: MetaDefinition = {
          name: 'Descripcion',
          content: this.titulo
      };

      this.meta.updateTag(metaTag);
    });
   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
    .pipe(
      filter ( ev => ev instanceof ActivationEnd ),
      filter ( (ev: ActivationEnd) => ev.snapshot.firstChild === null  ),
      map ( (evento: ActivationEnd) => evento.snapshot.data )
      );
  }

}
