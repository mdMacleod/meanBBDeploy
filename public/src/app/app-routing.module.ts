import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';
import { CreateComponent } from './create/create.component';
import { OneComponent } from './one/one.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  { path: 'pets', component: AllComponent},
  { path: 'pets/new', component: CreateComponent},
  { path: 'pets/:id', component: OneComponent},
  { path: 'pets/:id/edit', component: UpdateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
