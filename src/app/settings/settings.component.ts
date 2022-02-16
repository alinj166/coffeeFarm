import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  code:String;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.code=this.activatedRoute.snapshot.params['code'];
    

  }

}
