import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment:Assignment;

  // pour le formulaire
  nom = "";
  dateDeRendu = null;
  note:number;
  isRendu:boolean =false;
  isAffichageModificationNote:boolean;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.getAssignmentById();
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;

      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.isRendu = assignment.rendu;
      this.isAffichageModificationNote = assignment.rendu;
    });
  }


  onSubmit(event) {
    // on va modifier l'assignment
    
    if(!this.isAffichageModificationNote){
      if(this.isRendu){
        if((!this.nom) || (!this.dateDeRendu) || (!this.note))return;
      }else{
        if((!this.nom) || (!this.dateDeRendu))return;
      }
    }else{
      if((!this.nom) || (!this.dateDeRendu))return;
    }    

    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.rendu = this.isRendu;
    this.assignment.note = this.note;

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        this.toastr.success("L'assignment a été modifié.")
        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      })

  }

  onAssignmentRendu(){
      if(this.isRendu){
        this.isRendu = false;
      }else{
        this.isRendu = true;
      }
  }
}
