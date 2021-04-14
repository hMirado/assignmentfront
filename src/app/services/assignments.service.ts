import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Assignment } from '../components/assignments/assignment.model';
import { LoggingService } from '../shared/logging.service';
import { assignmentsGeneres } from '../shared/data';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[];

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  //uri = "http://localhost:8010/api/assignments";
  uri = "https://miradoassignmentback.herokuapp.com/api/assignments";

  getAssignments():Observable<Assignment[]> {
    console.log("Dans le service de gestion des assignments...");
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsPagine(page:number, limit:number, rendu:boolean):Observable<any> {
    return this.http.get<Assignment[]>(this.uri+"?page="+page + "&limit="+limit +"&rendu="+rendu);
  }

 
  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getAssignmentsAsPromise():Promise<Assignment[]> {
    console.log("Dans le service de gestion des assignments...")
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri).toPromise();
  }

  getAssignment(id:number):Observable<Assignment> {
    //let assignementCherche = this.assignments.find(a => a.id === id);

    //return of(assignementCherche);

    return this.http.get<Assignment>(this.uri + "/" + id)
    .pipe(
      // traitement 1
      map(a => {
        console.log(a)
        //a.nom += " MODIFIE PAR MAP";
        return a;
      }),
      tap(a => {
        console.log("TRACE DANS TAP : j'ai reçu " + a.nom);
      }),
      /*
      filter(a => {
        return (a.rendu)
      })
      */
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  generateId():number {
    return Math.round(Math.random()*100000);
  }

  addAssignment(assignment:Assignment):Observable<any> {
    assignment.id = this.generateId();
    //this.loggingService.log(assignment.nom, " a été ajouté");

    /*this.assignments.push(assignment);


    return of("Service: assignment ajouté !");*/

    return this.http.post(this.uri, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // besoin de ne rien faire puisque l'assignment passé en paramètre
    // est déjà un élément du tableau

    //let index = this.assignments.indexOf(assignment);

    //console.log("updateAssignment l'assignment passé en param est à la position " + index + " du tableau");
    this.loggingService.log(assignment.nom, " a été modifié");

    return this.http.put(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    /*
    let index = this.assignments.indexOf(assignment);

    this.assignments.splice(index, 1);
    */


    this.loggingService.log(assignment.nom, " a été supprimé");

    return this.http.delete(this.uri + "/" + assignment._id);

  }

  peuplerBD() {
    assignmentsGeneres.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      })
    })
  }

  // autre version qui permet de récupérer un subscribe une fois que tous les inserts
  // ont été effectués
  peuplerBDAvecForkJoin(professeurs:User[], etudiants:User[]): Observable<any> {
   const appelsVersAddAssignment = [];
    //console.log("liste professeur => "+professeurs+" étudiants => "+etudiants);
  //  console.log("professeur 0 "+professeurs[this.getRandomArbitrary(0, etudiants.length)].fName+ "role => "+professeurs[0].role+"/ étudiant 0 "+etudiants[this.getRandomArbitrary(0, etudiants.length)].fName+" role => "+etudiants[0].role);
    assignmentsGeneres.forEach((a) => {

      const nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.auteur = etudiants[this.getRandomInt(etudiants.length)];
      nouvelAssignment.professeur = professeurs[this.getRandomInt(professeurs.length)];
      nouvelAssignment.image = a.image;
      if(nouvelAssignment.rendu){
        nouvelAssignment.note = this.getRandomInt(20);
      }else{
        nouvelAssignment.note = null;
      }
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.remarque = "Remarque "+ nouvelAssignment.nom + "." ;
      nouvelAssignment.image = a.image;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
