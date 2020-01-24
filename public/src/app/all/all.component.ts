

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.pets = [];
    this.getAllPets()
  }


  pets: [];
  getAllPets(){
    let observable = this._httpService.getAll();
    observable.subscribe(data => {
      console.log("Got our Documents!", data)
      this.pets = data["pets"];
      console.log(this.pets);
    })
  }

}
