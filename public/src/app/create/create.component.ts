import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.newPet = { name: "", type: "", description: "", skillOne: "", skillTwo: "", skillThree: ""}
  }


    errors: {};
    newPet: {};
    onSubmitCreate() {
      console.log(this.newPet);
      let observable = this._httpService.create(this.newPet);
      observable.subscribe(data => { console.log(data);
        if (data["errors"]) {
          console.log("***ERROR_DATA***", data)
          this.errors = data["errors"]
        }
        else {
          this.errors = {title: "", description: ""};
          this.goPets()
        }
      })
    }

    goPets() {
      this._router.navigate(['/pets']);
    }

}
