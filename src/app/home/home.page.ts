import { Component } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  verificationId: any;
  code: number;
  phone: number;

  constructor(public navCtrl: NavController, public firebaseAuthentication: FirebaseAuthentication, public toastCtrl: ToastController) {
    firebaseAuthentication.onAuthStateChanged().subscribe((user) => {
      if (user) {
        navCtrl.navigateRoot(['/second-page']);
      } else {
        navCtrl.navigateRoot(['']);
      }
    });
  }

  async send() {
    try {
      const tell = '+91' + this.phone;
      const credential = await this.firebaseAuthentication.verifyPhoneNumber(tell, 60)

      this.verificationId = credential;
    } catch(err) {
      console.log(err);
      
    }
    
    
  }

  verify() {
    console.log(this.verificationId);
    
    this.firebaseAuthentication.signInWithVerificationId(this.verificationId, this.code).then(async (user) => {
      console.log(user)
      const toast = await this.toastCtrl.create({
        message : 'OTP Verified Succesfully.',
        duration: 5000
      })
      toast.present();
    });
  }
}