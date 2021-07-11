import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../../services/data/rest.service';
import { GnService } from '../../../services/data/gn.service';
import { ModalController, IonContent } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { PlayComponent } from '../play/play.component';
import { TafsirComponent } from '../tafsir/tafsir.component';

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  srh:any={
    translations:{
      id:{
        name:""
      }
    }
  };

  di = ['block', 'block', 1,2];
  ayh:any=[];
  constructor(private modalController:ModalController, private rs:RestService, private activatedRoute: ActivatedRoute, public gn:GnService) {
    
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id == '1') this.di = ['none', 'block'];
    if(id == '114') this.di = ['block', 'none'];
    
    this.di[2] = parseInt(id)-1;
    this.di[3] = parseInt(id)+1;
    this.rs.http.get('./assets/quran/surah/'+id+'.json').subscribe(data=>{
      let d = data;
      this.srh = d[parseInt(id)];
      let n = {
        txt:this.srh.text,
        trs:this.srh.translations.id.text
      }
      let nt = this.srh.text;
      for(var i = 0; i < Object.keys(nt).length; i++){
        this.ayh[i] = {
          no:i+1,
          txt:n.txt[i+1],
          trs:n.trs[i+1]
        }
      }
      
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    setTimeout(()=>{
      var ayah = this.activatedRoute.snapshot.paramMap.get('ayah');
      if(ayah){
        console.log(ayah)
        var el = document.getElementById('ay'+ayah);
        el.style.paddingTop = '64px';
        el.style.background = 'rgb(var(--ion-color-success-rgb), 0.1)'
        el.scrollIntoView();
    }
    }, 1000)
  }

  async ayahClick(event: any, id, surah, num) {
    const modal = await this.modalController.create({
      component: PopoverComponent,
      componentProps:{
        id:id,
        surah:surah,
        noSurah:num,
        tfs: this.srh.tafsir.id.kemenag.text[id]
      },
      swipeToClose: true,
      mode:"ios",
      cssClass:'modal-250px',
      backdropDismiss: true
    });
    modal.onDidDismiss().then(()=>{
      
    })
    return await modal.present();
  }

  async play() {    
    const modal = await this.modalController.create({
      component: PlayComponent,
      componentProps:{
        num:this.srh.number,
      },
      swipeToClose: true,
      mode:"ios",
      cssClass:'modal-audio',
      backdropDismiss: true
    });
    modal.onDidDismiss().then(()=>{
      
    })
    return await modal.present();
  }

  async tafsir() {    
    const modal = await this.modalController.create({
      component: TafsirComponent,
      componentProps:{
        num:this.srh.number,
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

  // scrollToLabel(label) {
  //   var titleELe = document.getElementById('ay-'+label);
  //   this.content.scrollToPoint(0, titleELe.offsetTop, 600);
  // }
}
