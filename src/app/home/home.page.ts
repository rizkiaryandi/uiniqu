import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { RestService } from '../services/data/rest.service';
import { GnService } from '../services/data/gn.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('bannerSlides', {static:true}) bannerSlides:IonSlides;
  @ViewChild('menuSlides', {static:true}) menuSlides:IonSlides;

  surah:any=[];
  defSurah:any;
  constructor(private rs:RestService, private gn:GnService) {}

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
    this.bannerSlides.update();
    this.menuSlides.update();
  }

  navSlide(val){

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
}
