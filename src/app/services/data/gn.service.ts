import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GnService {

  constructor(private router:Router) { }
  
  public navigate(url){
    this.router.navigateByUrl(url);
  }
}
