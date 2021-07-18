import { Component, OnInit } from '@angular/core';
import { GnService } from '../../../../services/data/gn.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-header',
  templateUrl: './popover-header.component.html',
  styleUrls: ['./popover-header.component.scss'],
})
export class PopoverHeaderComponent implements OnInit {

  dis = this.gn.popoverTranslateDisplay;
  constructor(private gn:GnService, private popoverController:PopoverController) { }

  ngOnInit() {
    this.dis = this.gn.popoverTranslateDisplay;
  }

  showTranslate(){
    this.gn.popoverTranslateDisplay = ['none', 'block'];
    this.gn.translateDisplay = 'block';
    this.popoverController.dismiss();
  }

  hideTranslate(){
    this.gn.popoverTranslateDisplay = ['block', 'none'];
    this.gn.translateDisplay = 'none';
    this.popoverController.dismiss();
  }
  
}
