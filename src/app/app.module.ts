import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
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


import {AssignmentsComponent} from './components/assignments/assignments.component';
import {RenduDirective} from './shared/rendu.directive';
import {NonRenduDirective} from './shared/non-rendu.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssignmentDetailComponent} from './components/assignments/assignment-detail/assignment-detail.component';
import {AddAssignmentComponent} from './components/assignments/add-assignment/add-assignment.component';
import {Routes, RouterModule} from '@angular/router';
import {EditAssigmentComponent} from './components/assignments/edit-assigment/edit-assigment.component';
import {AuthGuard} from './guards/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {LoginComponent} from './components/login/login.component';
import {RoleGuard} from "./guards/role.guard";
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './components/users/users.component';

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
        canActivate: [AuthGuard, RoleGuard]
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
    }
]

@NgModule({
    entryComponents: [UsersComponent],
    declarations: [
        AppComponent,
        AssignmentsComponent,
        RenduDirective,
        NonRenduDirective,
        AssignmentDetailComponent,
        AddAssignmentComponent,
        EditAssigmentComponent,
        LoginComponent,
        HeaderComponent,
        UsersComponent
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
        MatGridListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
