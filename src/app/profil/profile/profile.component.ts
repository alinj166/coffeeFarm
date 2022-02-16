import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NormalUser } from 'src/app/classes/normal-user';
import { MangeProfileService } from 'src/app/services/mange-profile.service';
import { NormalUserService } from 'src/app/services/normal-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usertab:NormalUser;
code:String;
  constructor(private activatedRoute:ActivatedRoute,public mangeServ:MangeProfileService,private userserv:NormalUserService) { }
  ngOnInit(): void {

    this.consultInfo();
    this.code=this.activatedRoute.snapshot.params['code'];
    

 
}
consultInfo()
{
   var user:NormalUser=new NormalUser();
    this.userserv.login().subscribe(data=>{
  user=data.map(e=>{
    return{
      id:e.payload.doc.id,
      code:e.payload.doc.data()['code'],
      email:e.payload.doc.data()['email'],
      phone:e.payload.doc.data()['phone'],
      image:e.payload.doc.data()['image'],
      password:e.payload.doc.data()['password'],
      task:e.payload.doc.data()['task'],
      admin:e.payload.doc.data()['admin'],
      name:e.payload.doc.data()['name'],
    };
  })
  this.usertab=user.find(e=>e.code==this.code);
      });


}


}
