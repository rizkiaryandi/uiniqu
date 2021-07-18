import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/data/rest.service';
import { GnService } from '../../../services/data/gn.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  num;
  aud = "";
  surah = "";
  dis="display:block";
  hit = 2;
  constructor(private rs:RestService, private modalController:ModalController, private gn:GnService) { }

  ngOnInit() {
    this.hit = 2;
    var a = this.num.toString();
    if(this.num < 10)a = "00"+a; 
    else if(this.num >= 10 && this.num <= 99) a = "0"+a;


    this.rs.http.get('./assets/quran/surah.json').subscribe(data=>{
      let d = data;
      this.aud = "https://server8.mp3quran.net/afs/"+a+".mp3";
      this.surah = d[this.num-1].nama;
    })
  }

  loadEv(){
    console.log('aa')
    this.dis="display:none"
  }

  close(){
    this.hit -=1;
    if(this.hit == 0){
      this.modalController.dismiss();
    } else{
      this.gn.toast("Ketuk sekali lagi untuk menutup", 'dark', 500);
    }
  }

}
