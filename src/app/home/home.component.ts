import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipement } from '../classes/equipement';
import { NormalUser } from '../classes/normal-user';
import { Plant } from '../classes/plant';
import { Report } from '../classes/report';
import { NormalUserService } from '../services/normal-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 reportsTab:Report[]=[];
tabArea=[{}];
tabEquipement:Equipement[]=[];
plant:Plant[]=[];
 usertab:NormalUser[]; 
  constructor(private activatedRoute:ActivatedRoute,private s:NormalUserService) { }
  code= this.activatedRoute.snapshot.params['code'];

  ngOnInit(): void {
this.getUserTab()
    this.getreportsTab();

  }
  getAreaNumber()
  { 
     this.s.area().subscribe(data=>{
      this.tabArea = data.map(e=>{
      return{
        id:e.payload.doc.id,
      
        
        };
    })
        });
  
   return this.tabArea?.length;
  }
  
 
  getPlantNumber()
  { var sum:number=0;
     this.s.plant().subscribe(data=>{
      this.plant=data.map(e=>{
   return {
   area: e.payload.doc.data()['area'],
   number: e.payload.doc.data()['number'],
   type: e.payload.doc.data()['type'],

        };
      })
    });
  for (let t of this.plant)
  {
    sum=sum+t.number;
  }
   return sum;
  }
  
  getSensorNumber()
{
  this.s.equipement().subscribe(data=>{
    this.tabEquipement = data.map(e=>{
    return{
      name:e.payload.doc.data()['name'],
      ip:e.payload.doc.data()['ip'],
     type:e.payload.doc.data()['type'],
     category:e.payload.doc.data()[' category'],
     posX:e.payload.doc.data()['posX'],
     posY:e.payload.doc.data()['posY'],

      
      };
  })
      });
return  this.tabEquipement.filter(e=>e.category=="sensor").length  ;
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
