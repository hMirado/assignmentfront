import { Injectable } from '@angular/core';
import {User} from "../shared/user.model";
import {LoggingService} from "../shared/logging.service";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {usersGeneres} from "../shared/data";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  selecteUser: User;
  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  //uri = "http://localhost:8010/api/users";
  uri = "https://backmadagascar2021.herokuapp.com/api/users"

  getUsersPagine(role: string):Observable<any> {
    return this.http.get<User[]>(this.uri + "?role="+role)
  }

  addUser(user: User):Observable<any>{
    return this.http.post(this.uri + '/register', user);
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddUser = [];

    usersGeneres.forEach((a) => {
      console.log('en cours');
      let nouvelUser = new User();
      nouvelUser.email = a.email;
      nouvelUser.password = a.password;
      nouvelUser.fName = a.fName;
      nouvelUser.lName = a.lName;
      nouvelUser.role = a.role;

      appelsVersAddUser.push(this.addUser(nouvelUser));
    });
    return forkJoin(appelsVersAddUser); // renvoie un seul Observable pour dire que c'est fini
  }
}
