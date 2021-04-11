import { User } from "src/app/shared/user.model";

export class Assignment {
  _id?:string;
  id:number;
  nom:string;
  dateDeRendu:Date;
  rendu:boolean;
  note: number;
  remarque: string;  
  matiere: string;
  image: string;
  auteur: User;
  professeur: User;
}
