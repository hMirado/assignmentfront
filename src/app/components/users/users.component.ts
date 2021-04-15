import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
    profsLength: number = 0;
    etudiantsLength: number = 0;

    displayedColumns = ['fName', 'lName', 'email', 'id'];
    displayedColumnsEtu = ['fName', 'lName', 'email', 'id'];
    dataSource = new MatTableDataSource<object>([]);
    dataSourceEtu = new MatTableDataSource<object>([]);

    @ViewChild('profPaginator', { read: MatPaginator }) paginatorProf: MatPaginator;

    //https://stackoverflow.com/questions/53845015/multiple-angular-material-table-in-single-page-pagination-issue
    @ViewChild('etuPaginator', { read: MatPaginator }) paginatorEtu: MatPaginator;

    constructor(private usersService: UsersService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(() => {
            this.getProf();
            this.getEtu();
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.dataSource.paginator = this.paginatorProf;
            this.dataSourceEtu.paginator = this.paginatorEtu;
        }, 500);
    }

    getProf() {
        this.usersService.getUsersPagine("professeur").subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
            this.profsLength = data.length;
        })
    }

    getEtu() {
        this.usersService.getUsersPagine("etudiant").subscribe(data => {
            this.dataSourceEtu = new MatTableDataSource(data);
            this.etudiantsLength = data.length;
        });
    }

    filterUser(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();
        this.dataSource.filter = filterValue.toLocaleLowerCase();
    }

    filterEtu(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceEtu.filter = filterValue.trim();
        this.dataSourceEtu.filter = filterValue.toLocaleLowerCase();
    }
}
