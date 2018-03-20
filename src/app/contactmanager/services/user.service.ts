import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    private _users: BehaviorSubject<User[]>;
  private dataStore:{
    users: User[]
  }

  constructor(private http: HttpClient) { 
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }
  
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  addUser(user: User): any {
    return new Promise((resolver, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this._users.next(Object.assign({}, this.dataStore).users);
      resolver(user);
    });
  }

  loadAll(){
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';

    return this.http.get<User[]>(usersUrl)
    .subscribe( data => {
      this.dataStore.users = data;
      this._users.next(Object.assign({},this.dataStore).users);
    }, error => {
      console.log("Failed to fetch user data");
    });
  }

  userById(userId: number) {
    return this.dataStore.users.find( x => x.id == userId); 
  }
}
