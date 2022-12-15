import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject<any>(null)

  constructor(
    private angularFireMessaging: AngularFireMessaging
  ) { }

  async requestPermission() {
    await this.angularFireMessaging.requestToken.subscribe((token) => {
      // this.currentMessage = token.asObservable()
      console.log(token);

      return token
    }, err => {
      console.log(err);
    })

    // return null
  }

  receiveMessaging() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('new messaging recived:', payload);
    })
  }

}
