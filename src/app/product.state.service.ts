import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class productStateService {

  private subject = new BehaviorSubject<any>(null);
  currentSubject = this.subject.asObservable();

  constructor() { }

  changeDetails(item: any) {
    console.log(item);
    this.subject.next(item);
  }
}