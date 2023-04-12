import { Component } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/shared/Service/api-service.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent {
  constructor(private fb:FormBuilder,private apiService:ApiServiceService, private router:Router) { 
    this.questionForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      tags:['',Validators.required]
    })
  }
  get queTitle(){
    return this.questionForm.get('title') 
  }
  get queDesc(){
    return this.questionForm.get('description')
  }
  get queTags(){
    return this.questionForm.get('tags')
  }

  ngOnInit(): void {
  }
  questionForm:FormGroup

submitQuestion(){
  let askedQuestion = this.questionForm.getRawValue();
  let user = JSON.parse(localStorage.getItem('userDetails') as string)
  if(askedQuestion && user && user.id){
    let question = {
      title:askedQuestion.title,
      description:askedQuestion.description,
      tags:askedQuestion.tags,
      views:0,
      votes:0,
      userId:user.id,
      answers:[]
    }
  console.log("question",question)
  this.apiService.postUserQuestions(question)?.subscribe({next:(res)=>{
    if(res){
      console.log(res)
      this.router.navigate(['/questions/question'])
    }
  },
  error:(err:any)=>{
    console.log(err)
  }})
  }
}
  get title(){
    return this.questionForm.get('title')
  }

  get description(){
    return this.questionForm.get('description')
  }

  get tags(){
    return this.questionForm.get('tags')
  }

}
