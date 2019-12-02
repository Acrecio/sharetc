import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DownloadComponent } from './download/download.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'upload', component: UploadComponent},
  { path: 'download', component: DownloadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
