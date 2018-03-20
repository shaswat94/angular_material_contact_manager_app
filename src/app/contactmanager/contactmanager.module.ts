import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContactmanagerAppComponent } from './contactmanager-app/contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UserService } from './services/user.service';
import { NotesComponent } from './components/notes/notes.component';
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';

const routes: Routes = [
  { path: 'contactmanager', component: ContactmanagerAppComponent,
    children:[
      { path:':id', component: MainContentComponent },
      { path:'', component: MainContentComponent }
    ]

  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    UserService
  ],
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent, 
    MainContentComponent, 
    SidenavComponent, 
    NotesComponent, 
    NewContactDialogComponent
  ],
  entryComponents:[
    NewContactDialogComponent
  ]
})
export class ContactmanagerModule { }
