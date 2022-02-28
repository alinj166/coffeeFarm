import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NormalUser } from '../classes/normal-user';
import { NormalUserService } from '../services/normal-user.service';
import {finalize} from 'rxjs/operators';

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
  imgSrc:String;
  selectedImage: any = null;
  constructor(private storage:AngularFireStorage,private fs:AngularFirestore,private userserv:NormalUserService,private f:FormBuilder,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.userForm=this.f.group({
    code:["",Validators.required],
    email:["",[Validators.required,Validators.pattern('[A-z,0-9]*@[A-z,.,0-9]+')]],
    phone:["",[Validators.pattern('[0-9]*')]],
    image:["",Validators.required],
    password:["",Validators.required],
    task:["",Validators.required],
      admin:[false],
      name:["",Validators.required]
    });


    this.consultInfo();
    this.code=this.activatedRoute.snapshot.params['code'];
  }

  get phone(){
    return this.userForm.controls.phone;
    }
    get email(){
      return this.userForm.controls.email;
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
  if (window.confirm("you want to delete this user")) {
    return this.userserv.delete(id);
}

}

addInfo()
{  var filePath = `profile/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.userForm.value.image = url;
          this.fs.collection("user").doc(this.usertab.find(e=>e.code==this.userForm.value.code).id).update({
            image:url
          })
        })
      })
    ).subscribe();
  
 
if (this.usertab.find(e=>e.code==this.userForm.value.code)==null)
  this.fs.collection("user").add(this.userForm.value)
  .then(
  () =>{
 alert("addition done successfully");
  
  }
  

 )
 else
 alert("formula already exists, re-enter!");

}
showPreview(event: any) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => this.imgSrc = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }
  else {
    this.imgSrc = null;
    this.selectedImage = null;
  }
}

}

