import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/shared/Service/api-service.service';
import { ProfileService } from 'src/app/shared/Service/profileService/profile.service';
import { loginData } from 'src/app/shared/interface/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any;
  userId: any;
  cartItems:any[]=[];
  matchedCustomer: any;
  users: any;
  matchedUser: any;
  constructor(private fb:FormBuilder,private profileService:ProfileService, private router:Router, private apiService:ApiServiceService){
   this.loginForm=this.fb.group({
     userName:['', [Validators.required]],
     password:['', Validators.required]
   }
   )
  }
  ngOnInit(){
  }
 get userName(){
   return this.loginForm.get('userName')
 }
 get password(){
  return this.loginForm.get('password')
 }
 
 loginData!:loginData
 loginUser(){
    this.loginData={
      userName: this.userName.value,
      password: this.password.value 
  }
  
  this.apiService.getUsers()?.subscribe(
    {
      next:(res:any)=>{
        if(res){
          this.users = res
          console.log(this.users)
          if(this.userName.value){
            this.matchedUser = this.users.find((res:any)=>res.username == this.userName.value && res.password == this.password.value);
            console.log(this.matchedUser)
            if(this.matchedUser){
              this.profileService.profileToggle.next(true)
              localStorage.setItem('token',"Token")
              localStorage.setItem('userDetails',JSON.stringify(this.matchedUser))
              this.router.navigate([''])
            }else{
              alert('not matched')
            }
          }
        }
      },
      error:(err:any)=>{
        console.log(err)
      }})
  }
  

  }


