import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../../services/data/rest.service';
import { GnService } from '../../../services/data/gn.service';
import { ModalController, IonContent, PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { PopoverHeaderComponent } from './popover-header/popover-header.component';
import { PlayComponent } from '../play/play.component';
import { TafsirComponent } from '../tafsir/tafsir.component';

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChildren('allTheseThings') things: QueryList<any>;
  srh:any={
    translations:{
      id:{
        name:""
      }
    }
  };
  
  di = ['block', 'block', 1,2];
  ayh:any=[];
  ho = true;
  constructor(private modalController:ModalController, private popoverController:PopoverController, private rs:RestService, private activatedRoute: ActivatedRoute, public gn:GnService) {
    
  }

  ionViewWillEnter(){
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


      var ayah = this.activatedRoute.snapshot.paramMap.get('ayah');
      if(ayah){
        this.things.changes.subscribe((a) => {
          setTimeout(()=>{
            var el = document.getElementById('ay'+ayah);
            el.classList.add("active-ayah");
            el.scrollIntoView();
          }, 100)
        })
      }
    })
  }

  async ayahClick(id) {
    var surah = this.srh.name_latin;
    var num = this.srh.number;
    var sr = this.ayh[id-1]
    const modal = await this.modalController.create({
      component: PopoverComponent,
      componentProps:{
        id:id,
        surah:surah,
        noSurah:num,
        sr:sr,
        tfs: this.srh.tafsir.id.kemenag.text[id],
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

  async headerPopover(ev){
    const popover = await this.popoverController.create({
      component: PopoverHeaderComponent,
      componentProps:{
        num:this.srh.number,
      },
      mode:"md",
      backdropDismiss: true,
      event:ev,
      translucent: true,
      cssClass: 'popo'
    });
    popover.onDidDismiss().then(()=>{
      
    })
    return await popover.present();
  }

  // scrollToLabel(label) {
  //   var titleELe = document.getElementById('ay-'+label);
  //   this.content.scrollToPoint(0, titleELe.offsetTop, 600);
  // }
}
