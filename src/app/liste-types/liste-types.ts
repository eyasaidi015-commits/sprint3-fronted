import { Component, OnInit } from '@angular/core';
import { TypePharmacie } from '../model/type-pharmacie.model';
import { PharmacieService } from '../services/pharmacie-service';
import { UpdateType } from '../update-type/update-type';

@Component({
  selector: 'app-liste-types',
  imports: [UpdateType],
  templateUrl: './liste-types.html',
  styleUrl: './liste-types.css'
})
export class ListeTypes implements OnInit {
  types: TypePharmacie[] = [];
  updatedType: TypePharmacie = { idType: 0, nomType: '' };
  ajout: boolean = true;
  erreur: string = '';

  constructor(private pharmacieService: PharmacieService) { }

  ngOnInit() {
    this.chargerTypes();
  }

  chargerTypes() {
    this.pharmacieService.listeTypes().subscribe(t => {
      this.types = t._embedded.types;
    });
  }

  resetForm() {
    this.updatedType = { idType: 0, nomType: '' };
    this.ajout = true;
  }

  typeUpdated(t: TypePharmacie) {
    const nom = t.nomType.trim();
    const existe = this.types.some(x =>
      x.nomType.trim().toLowerCase() === nom.toLowerCase() &&
      (this.ajout || x.idType !== t.idType)
    );

    if (existe) {
      this.erreur = 'Ce type existe déjà.';
      return;
    }

    this.erreur = '';
    if (this.ajout) {
      this.pharmacieService.ajouterType(nom).subscribe(() => {
        this.chargerTypes();
        this.resetForm();
      });
    } else {
      this.pharmacieService.updateType({ idType: t.idType, nomType: nom }).subscribe(() => {
        this.chargerTypes();
        this.resetForm();
      });
    }
  }

  updateType(t: TypePharmacie) {
    this.erreur = '';
    this.updatedType = { ...t };
    this.ajout = false;
  }

  supprimerType(t: TypePharmacie) {
    if (confirm('Voulez-vous vraiment supprimer ce type ?')) {
      this.pharmacieService.supprimerType(t.idType).subscribe({
        next: () => this.chargerTypes(),
        error: () => alert('Suppression impossible : ce type est utilisé par au moins une pharmacie.')
      });
    }
  }
}