import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/data/rest.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  num;
  aud = "";
  surah = "";
  constructor(private rs:RestService) { }

  ngOnInit() {
    this.rs.http.get('./assets/quran/surah.json').subscribe(data=>{
      let d = data;
      this.aud = d[this.num-1].audio;
      this.surah = d[this.num-1].nama;
    })
  }

}
