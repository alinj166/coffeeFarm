import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddImageComponent } from './add-image/add-image.component';
import { ConsultUserComponent } from './consult-user/consult-user.component';
import { EditCameraComponent } from './edit-camera/edit-camera.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EditProfilComponent } from './profil/edit-profil/edit-profil.component';
import { ProfileComponent } from './profil/profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path:'home/:code', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'consultUsers/:code', component:ConsultUserComponent},

  {path:'setting/:code', component:SettingsComponent},
  {path:'setting/addimage/:code', component:AddImageComponent},
  {path:'editcamera', component:EditCameraComponent},
  {path:'profile/:code', component:ProfileComponent},
  {path:'profile/edit/:code', component:EditProfilComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
