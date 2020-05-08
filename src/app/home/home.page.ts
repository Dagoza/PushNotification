import { Component } from '@angular/core';
import { Plugins, PushNotification, PushNotificationToken } from '@capacitor/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Observable } from 'rxjs';
import { MessagePushService } from '../message-push.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  token = '';
  items: Observable<any[]>
  constructor(private db: AngularFirestore,
     private mesenger: MessagePushService,
     private toast: ToastController) {}

ngOnInit() {
  this.items = this.db.collection('token').valueChanges()


  Plugins.PushNotifications.
  addListener('registration', (token: PushNotificationToken) =>{
      this.token = token.value;
  })
  
  Plugins.PushNotifications.
  addListener('pushNotificationReceived', async (notification:PushNotification)=>{
    const TOAST = await this.toast.create({
      message: notification.title,
      duration: 2000
    });

    TOAST.present();
  })
}

  requestPermissions(){
    Plugins.PushNotifications.register()
  }

  saveTokenInFirebase(){
    this.db.collection('token').doc().set({token:this.token})// add({token:this.token})
    .then(console.log).catch(console.log);
  }

  sendNotification(token){
    this.mesenger.sendNotification(token).then(console.log).catch(console.log);
  }

}
