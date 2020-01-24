import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { observable } from 'rxjs';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    console.log('**ROUTE PARAMS HERE**', this._route.params["value"])
    this.getOnePet(this._route.params["value"].id);
  }

  pet = {};
  petName: String;
  editPet: {};
  getOnePet(id: any){
    console.log(id)
    let observable = this._httpService.getOne(id);
    observable.subscribe(data => {
      console.log("Got one document", data)
      this.pet = data["pet"];
      this.editPet = data["pet"];
      this.petName = data["pet"].name;
      console.log(this.editPet);
    })
  }

  errors: {};
  onSubmitEdit() {
    console.log("**EDITAUTHORCOMPONENT**", this.editPet);
    let observable = this._httpService.update(this.editPet);
    observable.subscribe(data => { console.log(data)
      console.log("Sending Update Data to Service", data)

        if (data["errors"]) {
          console.log("***ERROR_DATA***", data)
          this.errors = data["errors"]
          this.getOnePet(this._route.params["value"].id);
        }
        else {
          this.errors = {title: "", description: ""};
          this.editPet = { _id: "", name: "", type: "", description: "", skillOne:"", skillTwo: "", skillThree: "" };
          this.goPets()
        }
        
      })
  }
  goPets() {
    this._router.navigate(['/pets']);
  }
 
}
  