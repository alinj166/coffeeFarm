import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NormalUser } from 'src/app/classes/normal-user';
import { NormalUserService } from 'src/app/services/normal-user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {finalize} from 'rxjs/operators';
@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {
  userForm!: FormGroup;
  usertab: NormalUser;
  imgSrc:String;
  selectedImage: any = null;
  constructor(private storage:AngularFireStorage,private fs:AngularFirestore,private router :Router,private userserv:NormalUserService,private f:FormBuilder,private activatedRoute:ActivatedRoute)
   { 

   }
  ngOnInit(): void {
    this.consultInfo();
    this.imgSrc = this.usertab?.image;

    this.userForm=this.f.group({
    
      email:[""],
      phone:[""],
      image:[""],
      task:[""],
      name:[""]
    });


}
  code= this.activatedRoute.snapshot.params['code'];
updateInfo(formValue)
{ 
  const fileRef = this.storage.ref(filePath);

  var filePath = `profile/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
  this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
    finalize(() => {
      fileRef.getDownloadURL().subscribe((url) => {
        formValue['image'] = url;
    
      })
    })
  ).subscribe();


  this.fs.collection("user").doc( this.usertab?.id).set({
    code: this.usertab?.code,
    password: this.usertab?.password,
    email: this.userForm.value.email,
    phone:this.userForm.value.phone,
    image:filePath,
    task:this.userForm.value.image,
    admin: this.usertab?.admin,
    name:this.userForm.value.name,
  })
  .then(
  () =>{
    this.router.navigate(['./home',this.code]);
  }
 )



}


consultInfo()
{  var user:NormalUser=new NormalUser();
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
  this.imgSrc = this.usertab?.image;
      });

}

onSubmit(formValue) {

 
    var filePath = `profile/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().subscribe();
  }






showPreview(event: any) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => this.imgSrc = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }
  else {
    this.imgSrc = this.usertab?.image;
    this.selectedImage = null;
  }
}

}


