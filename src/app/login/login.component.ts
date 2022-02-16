import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NormalUser } from '../classes/normal-user';
import { MangeProfileService } from '../services/mange-profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
usertab:NormalUser[];


  constructor(private mangServ:MangeProfileService,private router:Router) { }

  ngOnInit(): void {


  }


  code:String;
  password:String;
login()
{
 if (this.mangServ.getUserTab().find(e=>e.code==this.code && e.password==this.password)!=null)
 {
  this.router.navigate(["/home",this.code]);
  return true;
}
 else 
 {
alert("please try again");
  return false;

}
}
}
