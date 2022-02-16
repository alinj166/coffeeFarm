import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  imageUrl:String;
  fileToUpload:File=null;

 constructor() {

  }

  ngOnInit(): void {
    this.imageUrl="http://100dayscss.com/codepen/upload.svg";
  

 }

handleFileInput(file:FileList)
{
this.fileToUpload=file.item(0);

var reader=new  FileReader();
reader.onload=(event:any)=>{
this.imageUrl=event.target.result;
}

} 

 }
