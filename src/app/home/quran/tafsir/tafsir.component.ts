import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/data/rest.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tafsir',
  templateUrl: './tafsir.component.html',
  styleUrls: ['./tafsir.component.scss'],
})
export class TafsirComponent implements OnInit {

  num;
  txt = "";
  surah = "";
  sr;
  dis = "display:block;"
  constructor(private rs:RestService, private modalController: ModalController) { }

  ngOnInit() {
    if(this.sr == undefined){
      this.rs.http.get('./assets/quran/surah.json').subscribe(data=>{
        let d = data;
        this.txt = d[this.num-1].keterangan;
        this.surah = d[this.num-1].nama;
        this.dis = "display:none;"
      })
    }
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
