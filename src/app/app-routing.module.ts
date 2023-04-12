import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  
  {
    path:'',component:HomeComponent
  },
  {
      path:'user',
      loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule),
  },
  
  {
    path:'questions',
    loadChildren:()=>import('./modules/questions/questions.module').then(m=>m.QuestionsModule),
},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
