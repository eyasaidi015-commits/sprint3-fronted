import { TypePharmacie } from './type-pharmacie.model';

export class Pharmacie {
  idPharmacie!: number;
  nomPharmacie!: string;
  adressePharmacie!: string;
  telephonePharmacie!: string;
  dateOuverture!: Date;
  typePharmacie!: TypePharmacie;
}