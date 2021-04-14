import {Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './services/assignments.service';
import { AuthService } from './services/auth.service';
import {MatSidenav} from "@angular/material/sidenav";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Application de gestion des assignments";
  userToken: boolean = false;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(public authService:AuthService,
              private router:Router,
              private assignmentsService:AssignmentsService,
              private toastrService: ToastrService) {}

  /*
  login() {
    // si je suis pas loggé, je me loggue, sinon, si je suis
    // loggé je me déloggue et j'affiche la page d'accueil

    if(this.authService.loggedIn) {
      // je suis loggé
      // et bien on se déloggue
      this.authService.logOut();
      // on navigue vers la page d'accueil
      this.router.navigate(["/home"]);
    } else {
      // je ne suis pas loggé, je me loggue
      this.authService.logIn("admin", "toto");
    }
  }

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
  onLogout() {
    this.userToken = false;
    this.authService.signOut();
    this.toastrService.info('Déconnexion réussi');
    this.router.navigate(['/']);
  }
}
