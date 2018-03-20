import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactmanagerModule } from './contactmanager/contactmanager.module';

const routes: Routes = [
  { path: 'contactmanager', loadChildren:'./contactmanager/contactmanager.module#ContactmanagerModule' },
  { path: 'demo', loadChildren:'./demo/demo.module#DemoModule' },
  { path: '**', redirectTo: 'contactmanager' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContactmanagerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
