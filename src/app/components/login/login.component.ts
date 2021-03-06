import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";
import {AuthGuard} from "../../guards/auth.guard";
import {ToastrService} from 'ngx-toastr';
import {User} from "../../shared/user.model";
import {AssignmentsService} from "../../services/assignments.service";
import {UsersService} from "../../services/users.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    previousUrl;
    hide = true;

    email = '';
    password = '';

    constructor(private authService: AuthService,
                private router: Router,
                private authGuard: AuthGuard,
                private toastrService: ToastrService,
                private assignmentsService: AssignmentsService,
                private usersService:UsersService) {
    }

    ngOnInit(): void {
        if (this.authService.loggedIn())
            this.router.navigateByUrl('/home');

        if (this.authGuard.redirectUrl) {
            this.previousUrl = this.authGuard.redirectUrl;
            this.authGuard.redirectUrl = undefined;
        }
    }

    onLoginSubmit() {
        if(!this.email) {
            this.toastrService.error("Veuillez renseigner votre email");
            return;
        }
        if(!this.password) {
            this.toastrService.error("Veuillez renseigner votre mots de passe");
            return;
        }

        let user = new User();
        user.email = this.email;
        user.password = this.password;

        this.authService.signIn(user).subscribe((data: any) => {
            if (data.success) {
                this.authService.storeUserData(data.token, data.user);
                if (this.previousUrl) {
                    this.router.navigate([this.previousUrl]);
                } else {
                    this.toastrService.clear();
                    this.toastrService.success(data.message);
                    this.router.navigate(['/home']);
                }
            } else if (!data.success) {
                this.toastrService.clear();
                this.toastrService.error(data.message);
            }
        }, (error) => {
            this.toastrService.clear();
            this.toastrService.error(error);
        });
    }

    peuplerAssignmnents(){
        this.usersService.getUsersPagine("professeur").subscribe(professeurs => {
            const listProfesseur = professeurs;
            this.usersService.getUsersPagine("etudiant").subscribe(etudiants => {
                const listEtudiant = etudiants;
                this.assignmentsService.peuplerBDAvecForkJoin(listProfesseur, listEtudiant).subscribe(Response => {
                    console.log("base de donn??e peupl??e");
                });
            });
        })
    }

    peuplerUserBD() {
        this.usersService.peuplerBDAvecForkJoin()
            .subscribe(() => {
                console.log("LA BD A ETE PEUPLEE, TOUS LES USERS AJOUTES, ON RE-AFFICHE LA LISTE");
                this.router.navigate(["/user"], {replaceUrl: true});
            })
    }
}
