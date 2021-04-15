import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './services/assignments.service';
import { AuthService } from './services/auth.service';
import {MatSidenav} from "@angular/material/sidenav";
import {ToastrService} from "ngx-toastr";
import {UsersService} from "./services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Application de gestion des assignments";
  userToken: boolean = false;
  isAuthorized: boolean = false;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(public authService:AuthService,
              private router:Router,
              private assignmentsService:AssignmentsService,
              private toastrService: ToastrService,
              private usersService:UsersService) {}


  ngOnInit(): void {
    var role = localStorage.getItem('user');
    if(JSON.parse(role).role === 'admin') {
      this.isAuthorized = true;
    }
  }
  /*
  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.assignmentsService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
        this.router.navigate(["/home"], {replaceUrl:true});
      })
  }
  */


  onPeuplerAssignment(){
    this.usersService.getUsersPagine("professeur").subscribe(professeurs => {
      const listProfesseur = professeurs;
      this.usersService.getUsersPagine("etudiant").subscribe(etudiants => {
        const listEtudiant = etudiants;
        this.assignmentsService.peuplerBDAvecForkJoin(listProfesseur, listEtudiant).subscribe(Response => {
          console.log("base de donnée peuplée");
        });
      });
    })
  }

  onLogout() {
    this.userToken = false;
    this.authService.signOut();
    this.toastrService.info('Déconnexion réussi');
    this.router.navigate(['/']);
  }
}
