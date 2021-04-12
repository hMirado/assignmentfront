import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../shared/user.model";

@Component({
    selector: 'app-user-form',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
    hide = true;

    lName = '';
    fName = '';
    email = '';
    password = 'Password1234!';
    image = '';
    role = '';

    constructor(public userService: UsersService,
                private toastrService: ToastrService) {
    }

    ngOnInit(): void {
    }

    onSubmit(event) {
        if(!this.lName) {
            this.toastrService.error("Veuillez renseigner le nom de l'utilisateur");
            return;
        }
        if(!this.email) {
            this.toastrService.error("Veuillez renseigner l'email de l'utilisateur");
            return;
        }
        if(!this.password) {
            this.toastrService.error("Veuillez renseigner le nouveau mots de passe de l'utilisateur");
            return;
        }
        if(!this.role) {
            this.toastrService.error("Veuillez renseigner le rôle de l'utilisateur");
            return;
        }

        let nouvelUser = new User();
        nouvelUser.lName = this.lName;
        nouvelUser.fName = this.fName;
        nouvelUser.email = this.email;
        nouvelUser.password = this.password;
        nouvelUser.image = this.image;
        nouvelUser.role = this.role;

        this.userService.addUser(nouvelUser).subscribe((res) => {
            this.toastrService.clear();
            this.toastrService.success(res.message);
            this.formReset();
        }, error => {
            this.toastrService.clear();
            this.toastrService.error(error);
        })
    }

    formReset() {
        this.lName = '';
        this.fName = '';
        this.email = '';
        this.password = 'Password1234!';
        this.image = '';
        this.role = '';
    }
}
