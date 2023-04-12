import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/shared/Service/api-service.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  userQuestions: any;
  constructor(private router:Router, private apiService:ApiServiceService){ }
  askQues(){
    this.router.navigate(['/questions/ask-question'])
  }
  ngOnInit(){
    this.apiService.getUserQuestions()?.subscribe({next:(res:any)=>{
      if(res){
        this.userQuestions = res
      }
    },
  error:(err:any)=>{
    console.log(err)
  }})
  }
  routeToAnswerPage(id:number){
    this.router.navigate(['questions/question',id])
  }
}
