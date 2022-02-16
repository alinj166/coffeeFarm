import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NormalUser } from '../classes/normal-user';
import { Report } from '../classes/report';
import { NormalUserService } from '../services/normal-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 reportsTab:Report[]=[];
 
 usertab:NormalUser[]; 
  constructor(private activatedRoute:ActivatedRoute,private s:NormalUserService) { }
  code= this.activatedRoute.snapshot.params['code'];

  ngOnInit(): void {
this.getUserTab()
    this.getreportsTab();

  }


  getreportsTab()
{ 
   this.s.reports().subscribe(data=>{
    this.reportsTab = data.map(e=>{
    return{
      id:e.payload.doc.id,
      area:e.payload.doc.data()['area'],
      codeUser:e.payload.doc.data()['codeUser'],
     date:e.payload.doc.data()['date'],
     message:e.payload.doc.data()['message'],
     typeMessage:e.payload.doc.data()['typeMessage'],
    
      
      };
  })
      });

 return this.reportsTab.filter(e=>(e.codeUser==this.code||this.consultInfo(this.code).admin));
}




consultInfo(code)
{

return this.usertab?.find(e=>code==e.code);
}




getUserTab()
{    this.s.login().subscribe(data=>{
  

  this.usertab = data.map(e=>{
    return{
      id:e.payload.doc.id,
      code:e.payload.doc.data()['code'],
      admin:e.payload.doc.data()['admin'],
      name:e.payload.doc.data()['name'],
    };
  })
      });


}





}
