import { Component, Input, OnInit } from '@angular/core';
import { MangeProfileService } from '../services/mange-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private  mangeServ:MangeProfileService) { 
  
  }

  ngOnInit(): void {

  }
@Input() code="";

  consultInfo()
  {
    return this.mangeServ.getUserTab()?.find(l=>l.code == this.code);
  
  }
  adminNavigate()
  {
    if (this.consultInfo()?.admin==false)
  return true;
    else 
   return false;
  }
}
