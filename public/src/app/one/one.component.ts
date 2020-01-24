import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService

  ) { }

  counter: number;
  petID: String;
  ngOnInit() {
    this.counter = 0;
    this.petID = this._route.params["value"].id
    this.getOnePet(this.petID);
  }


  pet = {};
  petName: String;
  getOnePet(id){
    console.log(id)
    let observable = this._httpService.getOne(id);
    observable.subscribe(data => {
      console.log("Got one document", data)
      this.pet = data["pet"];
      console.log("***THIS_AUTHER***", this.pet);
      this.petName = data["pet"].name;
    })
  }

  
  
  bodyID: any;
  upvote(petID) {
    this.bodyID = ({id: petID})
    console.log("**UPVOTE_COMPONENT***", petID)
    let observable = this._httpService.upvote(this.bodyID);
    observable.subscribe (data => {
      console.log("**QUOTE_UPVOTE RETURN***", data)
      this.getOnePet(this._route.params["value"].id);
      this.counter+=1;
      this.bodyID =({id: ""})
      console.log("**COUNTER**", this.counter)
    })
  }

  destroy(petID) {
    console.log("**Destroy_COMPONENT***", petID)
    let observable = this._httpService.destroy(petID);
    observable.subscribe (data => {
      this.goPets()
    })
  }

  goPets() {
    this._router.navigate(['/pets']);
  }

 
}


