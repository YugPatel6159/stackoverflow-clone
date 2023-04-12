import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/shared/Service/profileService/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileToggle: boolean=false;
  profileName: any;
  searchTerm!:string
  constructor(private router:Router, private profileService:ProfileService){
  }
  ngOnInit(){
    this.profileService.profileToggle.subscribe((res:any)=>{
      if(res){
        this.profileToggle=res
      }
     })
     let users = JSON.parse(localStorage.getItem('userDetails') as string)
     if(users){
      this.profileName = users.first_name;
     }
  }
  routeToLogin(){
    this.router.navigate(['/user/login'])
  }
  routeToSigup(){
    this.router.navigate(['/user/signup'])
  }
  logout(){
   this.profileService.profileToggle.next(false);
  this.profileToggle = false;
   localStorage.removeItem('userDetails')
   localStorage.removeItem('token')
    this.router.navigate(['']);
  }
}
