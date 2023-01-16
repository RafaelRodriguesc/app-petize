import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nome: string = ''

  @Input('usuario') usuario: any;

  constructor() {
  }

  ngOnInit(): void {

    this.nome = this.usuario
    console.log('his', this.nome)
  }

}
