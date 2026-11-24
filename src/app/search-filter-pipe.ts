import { Pipe, PipeTransform } from '@angular/core';
import { Pharmacie } from './model/pharmacie.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(liste: Pharmacie[], texte: string): Pharmacie[] {
    if (!texte) {
      return liste;
    }
    const t = texte.toLowerCase();
    return liste.filter(p => p.nomPharmacie.toLowerCase().includes(t));
  }
}