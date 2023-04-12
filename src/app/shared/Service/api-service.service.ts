import { Injectable } from '@angular/core';
import { registerData } from '../interface/register.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { mergeMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }
  baseUrl = environment.baseUrl;
  userInfo = environment.userInfo;
  quesUrl = environment.quesUrl;
  registerUser(userDetails:registerData){
    try {
      return this.http.post(this.baseUrl+this.userInfo,userDetails);
    } catch (error) {
      console.log(error)
      return null
    }
  }
  getUsers(){
    try {
      return this.http.get(this.baseUrl+this.userInfo);
    } catch (error) {
      console.log((error))
      return null
    }
  }
  getUserDetails(userId:number){
    try {
      return this.http.get(this.baseUrl+this.userInfo+'/'+userId);
    } catch (error) {
      console.log((error))
      return null
    }
  }

  postUserQuestions(userQuestions:any){
    try {
      return this.http.post(this.baseUrl+this.quesUrl,userQuestions)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  getUserQuestions(){
    try {
      return this.http.get(this.baseUrl+this.quesUrl)
    } catch (error) {
      console.log(error);
      return null
    }
  }

  getUserQuestionById(id:number){
    try {
      return this.http.get(this.baseUrl+this.quesUrl+'/'+id)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  // postAnswers(newObject:any, id:number){
  //   try {
  //     return this.http.put(this.baseUrl+this.quesUrl+'/'+id,newObject)
  //   } catch (error) {
  //     console.log(error)
  //     return null
  //   } 
  // }
  post_Answer_data(customerId: number,data:any){
    try {
          return this.http.get(this.baseUrl+this.quesUrl+"/"+customerId).pipe(
            mergeMap((customer: any) => {
              const currentItemArray = customer.answers;
              currentItemArray.push(data);
    
              return this.http.patch(this.baseUrl+this.quesUrl+"/"+customerId, {
                answers: currentItemArray
              });
            })
          );
    } catch (error:any) {
      return throwError(() => new Error(error))
    }

  }
}
