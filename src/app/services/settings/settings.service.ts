import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'

  }

  constructor( @Inject(DOCUMENT) private _document ) { 

    this.cargarAjustes();

  }

  //Funcion que guarda el tema en el local storage
  guardarAjustes(){

    console.log('Se guardo en el ls');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));  

  }

  //Funcion para cargar ajustes del LS o asignar el tema por defecto
  cargarAjustes(){

    if (localStorage.getItem('ajustes')) {

      this.ajustes = JSON.parse( localStorage.getItem('ajustes'));
      console.log('Cargando ajuste');

      this.aplicarTema( this.ajustes.tema );
      
    } else{

      console.log('Cargando tema por defecto');
      this.aplicarTema( this.ajustes.tema );

    }

  }

  //Funcion para aplicar tema del local
  aplicarTema( tema: string ){

    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url );

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url

    this.guardarAjustes();

  }

}

interface Ajustes{

  temaUrl: string;
  tema: string;

}
