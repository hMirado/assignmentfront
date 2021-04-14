import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {AddAssignmentComponent} from './components/assignments/add-assignment/add-assignment.component';
import {AssignmentsComponent} from './components/assignments/assignments.component';
import {AssignmentDetailComponent} from './components/assignments/assignment-detail/assignment-detail.component';
import {UsersComponent} from './components/users/users.component';
import {AddUserComponent} from './components/users/add-form/add-user.component';
import {EditAssigmentComponent} from './components/assignments/edit-assigment/edit-assigment.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatStepperModule} from '@angular/material/stepper';
import {RenduDirective} from './shared/rendu.directive';
import {NonRenduDirective} from './shared/non-rendu.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';

import {AuthGuard} from './guards/auth.guard';
import {AuthService} from "./services/auth.service";
import {UsersService} from "./services/users.service";
import {EditUserComponent} from "./components/users/edit-user/edit-user.component";


const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        // idem avec  http://localhost:4200/home
        path: "home",
        component: AssignmentsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "add",
        component: AddAssignmentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "assignment/:id",
        component: AssignmentDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "assignment/:id/edit",
        component: EditAssigmentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "user",
        component: UsersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "add-user",
        component: AddUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "user/:id/edit",
        component: EditUserComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    declarations: [
        AppComponent,       
        RenduDirective,
        NonRenduDirective,
        AssignmentsComponent,
        AssignmentDetailComponent,
        AddAssignmentComponent,
        EditAssigmentComponent,
        LoginComponent,
        UsersComponent,
        AddUserComponent,
        EditUserComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule, MatDividerModule, MatIconModule,
        MatFormFieldModule, MatInputModule, MatDatepickerModule,
        MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
        MatSlideToggleModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-center'
        }),
        MatToolbarModule,
        MatTabsModule,
        MatBadgeModule,
        MatTableModule,
        MatPaginatorModule,
        MatGridListModule,
        MatSidenavModule,
        MatSelectModule,
        MatStepperModule,
        
    ],
    providers: [AuthGuard, AuthService, UsersService],
    bootstrap: [AppComponent]
})
export class AppModule {}
