import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { AssignmentsService } from '../../services/assignments.service';
import { Assignment } from './assignment.model';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
    assignmentsRendu: Assignment[];
    pageRendu: number = 1;
    limitRendu: number = 10;
    totalDocsRendu: number;
    totalPagesRendu: number;
    hasPrevPageRendu: boolean;
    prevPageRendu: number;
    hasNextPageRendu: boolean;
    nextPageRendu: number;
    

    assignmentsNonRendu: Assignment[];
    pageNonRendu: number = 1;
    limitNonRendu: number = 10;
    totalDocsNonRendu: number;
    totalPagesNonRendu: number;
    hasPrevPageNonRendu: boolean;
    prevPageNonRendu: number;
    hasNextPageNonRendu: boolean;
    nextPageNonRendu: number;

    // on injecte le service de gestion des assignments
    constructor(private assignmentsService: AssignmentsService,
        private route: ActivatedRoute,
        private router: Router,
        private usersService:UsersService) {
    }

    ngOnInit() {
        // on regarde s'il y a page= et limit = dans l'URL
        this.route.queryParams.subscribe(queryParams => {
            this.pageRendu = +queryParams.pageRendu || 1;
            this.limitRendu = +queryParams.limitRendu || 10;

            this.pageNonRendu = +queryParams.pageNonRendu || 1;
            this.limitNonRendu = +queryParams.limitNomRendu || 10;

            this.getAssignmentsRendu();
            this.getAssignmentsNonRendu();
        });
    }

    getAssignmentsRendu() {
        this.assignmentsService.getAssignmentsPagine(this.pageRendu, this.limitRendu, true)
            .subscribe(data => {
                this.assignmentsRendu = data.docs;
                this.pageRendu = data.page;
                this.limitRendu = data.limit;
                this.totalDocsRendu = data.totalDocs;
                this.totalPagesRendu = data.totalPages;
                this.hasPrevPageRendu = data.hasPrevPage;
                this.prevPageRendu = data.prevPage;
                this.hasNextPageRendu = data.hasNextPage;
                this.nextPageRendu = data.nextPage;
            });
    }

    getAssignmentsNonRendu() {
        this.assignmentsService.getAssignmentsPagine(this.pageNonRendu, this.limitNonRendu, false)
            .subscribe(data => {
                this.assignmentsNonRendu = data.docs;
                this.pageNonRendu = data.page;
                this.limitNonRendu = data.limit;
                this.totalDocsNonRendu = data.totalDocs;
                this.totalPagesNonRendu = data.totalPages;
                this.hasPrevPageNonRendu = data.hasPrevPage;
                this.prevPageNonRendu = data.prevPage;
                this.hasNextPageNonRendu = data.hasNextPage;
                this.nextPageNonRendu = data.nextPage;
            });
    }

    onDeleteAssignment(event) {
        // event = l'assignment à supprimer

        //this.assignments.splice(index, 1);
        this.assignmentsService.deleteAssignment(event)
            .subscribe(message => {
                console.log(message);
            })
    }

    premierePage(rendu: boolean) {
        if (rendu) {            
            this.router.navigate(['/home'], {
                queryParams: {
                    pageRendu: 1,
                    limitRendu: this.limitRendu,
                    pageNonRendu: this.pageNonRendu,
                    limitNonRendu: this.limitNonRendu,
                }
            });
        } else {
            this.router.navigate(['/home'], {
                queryParams: {
                    pageRendu: this.pageRendu,
                    limitRendu: this.limitRendu,
                    pageNonRendu: 1,
                    limitNonRendu: this.limitNonRendu,
                }
            });
        }

    }

    pageSuivante(rendu: boolean) {
        if (rendu) {            
            this.router.navigate(['/home'], {
                queryParams: {
                    pageRendu: this.nextPageRendu,
                    limitRendu: this.limitRendu,
                    pageNonRendu: this.pageNonRendu,
                    limitNonRendu: this.limitNonRendu,
                }
            });
        } else {
            this.router.navigate(['/home'], {
                queryParams: {
                    pageRendu: this.pageRendu,
                    limitRendu: this.limitRendu,
                    pageNonRendu: this.nextPageNonRendu,
                    limitNonRendu: this.limitNonRendu,
                }
            });
        }

    }


    pagePrecedente(rendu: boolean) {
        if (rendu) {
            this.router.navigate(['/home'], {
                queryParams: {
                    pageRendu: this.prevPageRendu,
                    limitRendu: this.limitRendu,                    
                    pageNonRendu: this.pageNonRendu,
                    limitNonRendu: this.limitNonRendu,
                }
            });
        } else {
            this.router.navigate(['/home'], {
                queryParams: {
                    pageRendu: this.pageRendu,
                    limitRendu: this.limitRendu,
                    pageNonRendu: this.prevPageNonRendu,
                    limitNonRendu: this.limitNonRendu,
                }
            });
        }

    }

    dernierePage(rendu: boolean) {
        if (rendu) {
            this.router.navigate(['/home'], {
                queryParams: {
                    pageRendu: this.totalPagesRendu,
                    limitRendu: this.limitRendu,                    
                    pageNonRendu: this.pageNonRendu,
                    limitNonRendu: this.limitNonRendu,
                }
            });
        } else {
            this.router.navigate(['/home'], {
                queryParams: {
                    pageRendu: this.pageRendu,
                    limitRendu: this.limitRendu,
                    pageNonRendu: this.totalPagesNonRendu,
                    limitNonRendu: this.limitNonRendu,
                }
            });
        }

    }

    peuplerAssignmnents(){
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
}
