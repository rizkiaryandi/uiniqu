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
  constructor(private rs:RestService, private modalController: ModalController) { }

  ngOnInit() {
    if(this.txt == ""){
      this.rs.http.get('./assets/quran/surah.json').subscribe(data=>{
        let d = data;
        this.txt = d[this.num-1].keterangan;
        this.surah = d[this.num-1].nama;
      })
    }
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
