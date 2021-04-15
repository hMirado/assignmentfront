import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/user.model';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom = '';
  dateDeRendu = null;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  listProfesseurs:User[];
  listEtudiants:User[];

  isRendu:boolean = true;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router,
              private _formBuilder: FormBuilder,
              private userServices:UsersService,
               private toastrService:ToastrService) {}

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({    
      nom: ['', Validators.required],
      matiere: ['', Validators.required],
      date: ['', Validators.required]         
    });
    this.secondFormGroup = this._formBuilder.group({
      etudiantSelect: ['', Validators.required],
      professeurSelect:['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      rendu: [],
      note: [],
      remarque: []   
    });

    this.userServices.getUsersPagine("professeur").subscribe(professeurs => {
      this.listProfesseurs = professeurs;
    });

    this.userServices.getUsersPagine("etudiant").subscribe(etudiant => {
      this.listEtudiants = etudiant;
    });

  }

  onSubmit(event) {
    if((!this.nom) || (!this.dateDeRendu)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/home"]);
      });
  }

  onEnregistrerEssignment(){
    console.log("validation des formulaire => "+this.secondFormGroup.valid);
    if(this.firstFormGroup.valid && this.secondFormGroup.valid){
      const informationAssignments = this.firstFormGroup.value;
      const professeurEtEtudiant = this.secondFormGroup.value;
      const validation = this.thirdFormGroup.value;

      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = informationAssignments.nom;
      nouvelAssignment.dateDeRendu = informationAssignments.date;
      nouvelAssignment.matiere = informationAssignments.matiere;
      nouvelAssignment.professeur = this.listProfesseurs[professeurEtEtudiant.professeurSelect];
      nouvelAssignment.auteur = this.listEtudiants[professeurEtEtudiant.etudiantSelect];
      nouvelAssignment.image = "http://dummyimage.com/200x200.png/ff4444/ffffff";
      if(validation.rendu){
        nouvelAssignment.rendu = true;
        if(validation.note != null){
          nouvelAssignment.note = validation.note;
        }else{
          nouvelAssignment.note = 0;
        }
      }else{
        nouvelAssignment.rendu = false;
        nouvelAssignment.note = null;
      }

      nouvelAssignment.remarque = validation.remarque;
      this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(response =>{
        console.log(response.message);
        this.toastrService.success("L'assignment a été ajouté.");
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(["/home"]);
      });

    }else{
      return;
    }
    
    console.log(this.thirdFormGroup.value)
  }

  onRendu(){
    
    if(this.isRendu)
    {
      this.isRendu=false;
    } else{
      this.isRendu=true;
    }
  }

}
