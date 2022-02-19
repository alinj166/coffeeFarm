import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class NormalUserService {

  constructor(private fs:AngularFirestore) {
    
  }

 login()
  {
  return this.fs.collection('user').snapshotChanges();
  }
    reports(){
  return this.fs.collection('reports').snapshotChanges();
  }
 delete(id)
 {
  const tutorialsRef = this.fs.collection('user');
  tutorialsRef.doc(id).delete();
 }
 area()
 {
  return this.fs.collection('area').snapshotChanges();
 }

 equipement()
 {
  return this.fs.collection('Equipement').snapshotChanges();
 }
 plant()
 {
  return this.fs.collection('plant').snapshotChanges();
  
 }
}
