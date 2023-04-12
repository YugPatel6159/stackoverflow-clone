import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnswerComponent } from './answer/answer.component';


@NgModule({
  declarations: [
    AskQuestionComponent,
    AnswerComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class QuestionsModule { }
