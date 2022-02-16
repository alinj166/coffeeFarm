import { Component, OnInit } from '@angular/core';
import { NormalUser } from '../classes/normal-user';
import { NormalUserService } from '../services/normal-user.service';

@Component({
  selector: 'app-consult-user',
  templateUrl: './consult-user.component.html',
  styleUrls: ['./consult-user.component.css']
})
export class ConsultUserComponent implements OnInit {
  usertab:NormalUser[]=[];
  constructor(private userserv:NormalUserService) { }

  ngOnInit(): void {
    this.consultInfo();

  }


  consultInfo()
  {
      this.userserv.login().subscribe(data=>{
        this.usertab=data.map(e=>{
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
        });
  
      }
deleteUser(id)
{
return this.userserv.delete(id);
}
}
