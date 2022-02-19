import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NormalUser } from '../classes/normal-user';
import { NormalUserService } from '../services/normal-user.service';

@Component({
  selector: 'app-consult-user',
  templateUrl: './consult-user.component.html',
  styleUrls: ['./consult-user.component.css']
})
export class ConsultUserComponent implements OnInit {
  usertab:NormalUser[]=[];
  code:string;
  hide:boolean=true;
  userForm!: FormGroup;
  constructor(private fs:AngularFirestore,private userserv:NormalUserService,private f:FormBuilder,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.userForm=this.f.group({
    code:[""],
    email:[""],
    phone:[""],
    image:[""],
    password:[""],
      task:[""],
      admin:[false],
      name:[""]
    });


    this.consultInfo();
    this.code=this.activatedRoute.snapshot.params['code'];


    
  }

  hideWindow()
 { if (!this.hide)
   this.hide=true;
  else 
  this.hide=false;
  
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

addInfo()
{ 
 

  this.fs.collection("user").add(this.userForm.value)
  .then(
  () =>{
    alert("l'ajout fait avec succés");
  }
 )



}

}
