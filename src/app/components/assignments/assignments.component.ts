import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssignmentsService} from '../../services/assignments.service';
import {Assignment} from './assignment.model';
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
    assignments: Assignment[];
    assignmentsNonRendu: Assignment[];
    page: number = 1;
    pageNonRendu: number = 1;
    limit: number = 10;
    limitNonRendu: number = 10;
    totalDocs: number;
    totalDocsNonRendu: number;
    totalPages: number;
    totalPagesNonRendu: number;
    hasPrevPage: boolean;
    hasPrevPageNonRendu: boolean;
    prevPage: number;
    prevPageNonRendu: number;
    hasNextPage: boolean;
    hasNextPageNonRendu: boolean;
    nextPage: number;
    nextPageNonRendu: number;

    tabId: number = 0;

    // on injecte le service de gestion des assignments
    constructor(private assignmentsService: AssignmentsService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        // on regarde s'il y a page= et limit = dans l'URL
        this.route.queryParams.subscribe(queryParams => {
            this.page = +queryParams.page || 1;
            this.limit = +queryParams.limit || 10;

            this.getAssignmentsRendu();
        });
    }

    getAssignmentsRendu() {
        this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
            .subscribe(data => {
                this.assignments = data.docs;
                this.page = data.page;
                this.limit = data.limit;
                this.totalDocs = data.totalDocs;
                this.totalPages = data.totalPages;
                this.hasPrevPage = data.hasPrevPage;
                this.prevPage = data.prevPage;
                this.hasNextPage = data.hasNextPage;
                this.nextPage = data.nextPage;
            });
    }

    getAssignmentsNonRendu() {
        this.assignmentsService.getAssignmentsPagineNonRendu(this.page, this.limit)
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

    onLoadAssignments(event: MatTabChangeEvent) {
        console.log(event);
        // @ts-ignore
        if (event.index == 0) {
            this.getAssignmentsRendu();
            this.tabId = 0;
        } else {
            this.getAssignmentsNonRendu();
            this.tabId = 1;
        }
    }

    onDeleteAssignment(event) {
        // event = l'assignment à supprimer

        //this.assignments.splice(index, 1);
        this.assignmentsService.deleteAssignment(event)
            .subscribe(message => {
                console.log(message);
            })
    }

    premierePage() {
        if (this.tabId == 1) {
            this.router.navigate(['/home'], {
                queryParams: {
                    page: 1,
                    limit: this.limitNonRendu,
                }
            });
        } else {
            this.router.navigate(['/home'], {
                queryParams: {
                    page: 1,
                    limit: this.limit,
                }
            });
        }
    }

    pageSuivante() {
        console.log(this.tabId);
        /*
        this.page = this.nextPage;
        this.getAssignments();*/
        if (this.tabId == 1) {
            this.router.navigate(['/home'], {
                queryParams: {
                    page: this.nextPageNonRendu,
                    limit: this.limitNonRendu,
                }
            });
        } else {
            this.router.navigate(['/home'], {
                queryParams: {
                    page: this.nextPage,
                    limit: this.limit,
                }
            });
        }
    }


    pagePrecedente() {
        if (this.tabId == 1) {
            this.router.navigate(['/home'], {
                queryParams: {
                    page: this.prevPageNonRendu,
                    limit: this.limitNonRendu,
                }
            });
        } else {
            this.router.navigate(['/home'], {
                queryParams: {
                    page: this.prevPage,
                    limit: this.limit,
                }
            });
        }
    }

    dernierePage() {
        if (this.tabId == 1) {
            this.router.navigate(['/home'], {
                queryParams: {
                    page: this.totalPagesNonRendu,
                    limit: this.limitNonRendu,
                }
            });
        } else {
            this.router.navigate(['/home'], {
                queryParams: {
                    page: this.totalPages,
                    limit: this.limit,
                }
            });
        }
    }
}
