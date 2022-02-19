import { Component, Input, OnInit } from '@angular/core';
import { MangeProfileService } from '../services/mange-profile.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private  mangeServ:MangeProfileService) { }

  ngOnInit(): void {
  }
  @Input() code = '';

  consultInfo()
  {
    return this.mangeServ.getUserTab()?.find(l=>l.code == this.code);
  
  }
  adminNavigate():boolean
  {
    if (this.consultInfo()?.admin==false)
  return true;
    else 
   return false;
  }
}

