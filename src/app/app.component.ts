import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private el: ElementRef, private renderer:Renderer2){}

  ngAfterViewInit(){

this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', '#e2e8f0 ');

}
  title = 'coffeeFarm';


}
