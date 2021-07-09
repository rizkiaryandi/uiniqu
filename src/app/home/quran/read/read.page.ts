import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../../services/data/rest.service';
import { GnService } from '../../../services/data/gn.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {
  srh:any={
    translations:{
      id:{
        name:""
      }
    }
  };

  di = ['block', 'block', 1,2];
  ayh:any=[];
  constructor(private rs:RestService, private activatedRoute: ActivatedRoute, public gn:GnService) { }

  ngOnInit() {
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

}
