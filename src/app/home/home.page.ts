import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { RestService } from '../services/data/rest.service';
import { GnService } from '../services/data/gn.service';
import { PlayComponent } from './quran/play/play.component';
import { TafsirComponent } from './quran/tafsir/tafsir.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('bannerSlides', {static:true}) bannerSlides:IonSlides;
  @ViewChild('menuSlides', {static:true}) menuSlides:IonSlides;

  lr = "none";
  surah:any=[];
  defSurah:any;
  lastRead:any = {};
  constructor(private modalController:ModalController, private rs:RestService, private gn:GnService) {}

  ngOnInit(){
    this.rs.http.get('./assets/quran/surah.json').subscribe(data=>{
      this.surah = data;
      this.defSurah = data;
    })
  }
  
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  ionViewDidEnter(){
    this.gn.st.get('lastRead').then(data=>{
      if(data != null){
        this.lr = 'block';
        this.lastRead = data
      }
    })

    this.bannerSlides.update();
    this.menuSlides.update();
  }

  navSlide(val){
    this.menuSlides.slideTo(parseInt(val));
  }

  openSurah(id){
    this.gn.navigate('home/quran/read/'+id);
  }

  

  search(val){
    if(val == ""){
      this.surah = this.defSurah;
    } else{
      this.surah = this.searcha(this.defSurah, val);
    }
  }

  searcha(array, keyword){
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
        return value.nama.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
        value.nomor.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
        value.arti.toLowerCase().match(new RegExp(searchTerm, 'g'))
    })
  }

  async play(num) {    
    const modal = await this.modalController.create({
      component: PlayComponent,
      componentProps:{
        num:num,
      },
      mode:"ios",
      cssClass:'modal-audio',
      backdropDismiss: true
    });
    modal.onDidDismiss().then(()=>{
      
    })
    return await modal.present();
  }

  async tafsir(num) {    
    const modal = await this.modalController.create({
      component: TafsirComponent,
      componentProps:{
        num:num,
      },
      swipeToClose: true,
      mode:"ios",
      cssClass:'modal-tafsir',
      backdropDismiss: true
    });
    modal.onDidDismiss().then(()=>{
      
    })
    return await modal.present();
  }

}
