import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GnService {
  public translateDisplay = "block";
  public popoverTranslateDisplay = ['none','block'];
  constructor(private router:Router, public st:Storage, public toastController:ToastController, public alert:AlertController, public loading:LoadingController) { }
  
  public navigate(url){
    this.router.navigateByUrl(url);
  }

  public async toast(text, color='light', duration = 2000) {
    const toast = await this.toastController.create({
      message: text,
      duration: duration,
      color:color
    });
    toast.present();
  }
}
