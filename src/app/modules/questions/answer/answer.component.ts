import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/shared/Service/api-service.service';
import { answerInterface } from 'src/app/shared/interface/answer.interface';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
userId: any;
  questionById: any;
  ansForm!:FormGroup;
  Object!: answerInterface;
constructor(private route:ActivatedRoute,private router:Router, private apiService:ApiServiceService, private fb:FormBuilder){
  this.route.params.subscribe((res:any)=>{
    if(res){
      this.userId = res['id']
      console.log(this.userId);
    }
  })
  this.ansForm=this.fb.group({
    answer:['', [Validators.required]]
  }
 )
  
}
answerArray:answerInterface[]=[];
get answer(){
  return this.ansForm.get('answer')
}
ngOnInit(){
  this.apiService.getUserQuestionById(this.userId)?.subscribe({next:(res:any)=>{
    if(res){
     this.questionById = res
     this.answerArray = res.answers
    }
  },
error:(err:any)=>{
  console.log(err)
}})
}
date() {
  let date = new Date();
  var getYear = date.toLocaleString('default', { year: 'numeric' });
  var getMonth = date.toLocaleString('default', { month: '2-digit' });
  var getDay = date.toLocaleString('default', { day: '2-digit' });
  var dateFormat = getYear + '-' + getMonth + '-' + getDay;
  return dateFormat;
}
submit(){
  // this.answerArray.push(this.answer?.value);
  this.apiService.getUserQuestionById(this.userId)?.subscribe({next:(res:any)=>{
    if(res){
      this.answerArray = res.answer;
      this.Object = {
        userId:JSON.parse(localStorage.getItem('userDetails')as string).id,
        answers:this.answer?.value,
        date:this.date()
        }
        
      this.apiService.post_Answer_data(res.id,this.Object)?.subscribe({next:(res:any)=>{
        if(res){
          console.log(res)
      }
    },error:(err:any)=>{
      console.log(err)
    }})
    }
    this.router.navigate(['questions/question'])
  },
error:(err:any)=>{
  console.log(err)
}})
}

}
