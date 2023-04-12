import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { TagsComponent } from 'src/app/shared/components/tags/tags.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { AnswerComponent } from './answer/answer.component';

const routes: Routes = [
 {
  path:'question', component:QuestionsComponent 
 },
 {
  path:'tags', component:TagsComponent
 },
 {
  path:'ask-question',component:AskQuestionComponent
 },
 {
  path:'question/:id',component:AnswerComponent
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
