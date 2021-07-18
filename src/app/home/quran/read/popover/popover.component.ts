import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from '../../../../services/data/rest.service';
import { GnService } from '../../../../services/data/gn.service';
import { TafsirComponent } from '../../tafsir/tafsir.component';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  id = 0;
  noSurah = 0;
  surah = "";
  qori:any = [];
  pQori="";
  pLink = "";
  tfs = "";
  sr;
  constructor(private modalController:ModalController, private rs:RestService, private gn:GnService) { }

  ngOnInit() {
    this.pQori = "Alafasy_64kbps";
    this.pickQori();
    this.rs.http.get('./assets/quran/qori.json').subscribe(data=>{
      this.qori = Object.values(data);
    })
  }

  lastRead(){
    this.modalController.dismiss();
    this.gn.st.set('lastRead',{
      surah_id: this.noSurah,
      ayah: this.id,
      surah: this.surah
    }).then(()=>{
      this.gn.toast("Terakhir Dibaca: "+this.surah+" ayat "+this.id, "medium");
    })
    
  }

  success(){
    this.modalController.dismiss();
  }

  tafsir(){
    this.modalController.dismiss();
  }

  changeQori(ev){
    this.pQori = ev.target.value;
    this.pickQori();
  }

  pickQori(){
    var a = this.id.toString();
    var b = this.noSurah.toString();
    if(this.id < 10)a = "00"+a; 
    else if(this.id >= 10 && this.id <= 99) a = "0"+a;

    
    if(this.noSurah < 10)b = "00"+b; 
    else if(this.noSurah >= 10 && this.noSurah <= 99) b = "0"+b;

    this.pLink = "https://www.everyayah.com/data/"+this.pQori+"/"+b+a+".mp3"
  }

  async tafsirClick() {    
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: TafsirComponent,
      componentProps:{
        surah:"Tafsir "+this.surah+" • "+this.id,
        txt:this.tfs,
        sr:this.sr
      },
      mode:"ios",
      cssClass:'modal-tafsir',
      backdropDismiss: true
    });
    modal.onDidDismiss().then(()=>{
      
    })
    return await modal.present();
  }

}
