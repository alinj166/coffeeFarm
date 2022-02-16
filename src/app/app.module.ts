import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';


import { AngularFireModule } from '@angular/fire/compat';

import { AddImageComponent } from './add-image/add-image.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EditCameraComponent } from './edit-camera/edit-camera.component';
import { EditProfilComponent } from './profil/edit-profil/edit-profil.component';
import { ProfileComponent } from './profil/profile/profile.component';
import { ConsultUserComponent } from './consult-user/consult-user.component';

 const firebaseConfig = {
  apiKey: "AIzaSyDN6tIc3HNMQJLuBlmuqpyQ33YtPzrpZ-0",
  authDomain: "coffeefarm-7cdae.firebaseapp.com",
  databaseURL: "https://coffeefarm-7cdae-default-rtdb.firebaseio.com",
  projectId: "coffeefarm-7cdae",
  storageBucket: "coffeefarm-7cdae.appspot.com",
  messagingSenderId: "562294986242",
  appId: "1:562294986242:web:3c00227849ac27d9d2791b"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    ErrorComponent,
    LoginComponent,
    SettingsComponent,
    AddImageComponent,
    EditCameraComponent,
   ProfileComponent,
    EditProfilComponent,
    ConsultUserComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
