import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Router } from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
  //this checks for the width of the screen 
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  users: Observable<User[]>
  isDarkTheme: boolean = false;
  dir: string = 'ltr';

  //refreshes the mediamatcher each time(when screen size changes) it is updated via ngzone
  constructor(
    zone: NgZone, 
    private userService: UserService,
    private router: Router) {
    this.mediaMatcher.addListener(mql => 
      zone.run( () => this.mediaMatcher == mql ));
  }

  // increase(){
  //   this.sideNavWidth = 15;
  //   console.log("increase sidenav width");
  // }

  // decrease(){
  //   this.sideNavWidth = 57;
  //   console.log("decrease sidenav width");
  // }

  @ViewChild(MatSidenav) sidenav: MatSidenav; //Refernence to our sidenav in template(#sidenav)

  toggleTheme(){
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir(){
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    this.sidenav.toggle().then( () => this.sidenav.toggle());
  }

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(() => {
      if(this.isSmallScreen())
      this.sidenav.close();
    });
  }

  isSmallScreen(): boolean{
    return this.mediaMatcher.matches;
  }
}
