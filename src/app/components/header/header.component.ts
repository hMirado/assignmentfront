import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    title = 'Application de gestion des assignments';
    userToken: boolean = false;

    constructor(public authService: AuthService,
                private router: Router,
                private toastrService: ToastrService) {
    }

    ngOnInit(): void {
    }

    onLogout() {
        this.userToken = false;
        this.authService.signOut();
        this.toastrService.info('Déconnexion réussi');
        this.router.navigate(['/']);
    }
}
