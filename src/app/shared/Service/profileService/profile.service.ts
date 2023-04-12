import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }
  
  profileToggle = new BehaviorSubject<any>(true);
  profileToggle$ = this.profileToggle.asObservable();
}
