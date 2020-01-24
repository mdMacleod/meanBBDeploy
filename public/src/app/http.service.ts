import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient){
      
      console.log("****HTTP_SERVICE CONSTRUCTOR****");
  }

  getAll(){
    console.log("***HTTP_SERVICE Get All ***");
    return this._http.get('/app/pets/all');
}

  getOne(id){
    console.log("***HTTP_SERVICE GetONE ***", id);
    return this._http.get('/app/pets/'+id);
  }

  create(newPet) {
    console.log("***HTTP_SERVICE CREATE ***", newPet);
    return this._http.post('/app/pets/create', newPet)
  }
  
  
  update(editPet){
    return this._http.put('/app/pets/update', editPet);
  }
    
    upvote(petID) {
      console.log("***HTTP_SERVICE UPVOTE", petID);
      return this._http.put('/app/upvote', petID);
    }
    
    destroy(id){
      console.log(id);
      console.log("***HTTP_SERVICE Destroy***", id);
      return this._http.delete("/app/pets/destroy/"+id);
    }
    // downvote(info) {
    //   console.log("***HTTP_SERVICE DOWNVOTE", info);
    //   return this._http.put('/app/downvote', info);
    // }
    
}
