import { Injectable } from '@angular/core';
import { NormalUser } from '../classes/normal-user';
import { NormalUserService } from './normal-user.service';
import { AngularFirestore} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class MangeProfileService {
 public  usertab:NormalUser[];
  constructor(private s:NormalUserService) { }
 public m:String;
  ngOnInit(): void {




    }
    
getUserTab(): NormalUser[]
{    this.s.login().subscribe(data=>{
  

  this.usertab = data.map(e=>{
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

  return this.usertab;
}



        }
  
       
    
    
       
    
      
     
