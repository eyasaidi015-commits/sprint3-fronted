import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pharmacie } from '../model/pharmacie.model';
import { TypePharmacie } from '../model/type-pharmacie.model';
import { PharmacieService } from '../services/pharmacie-service';
import { SearchFilterPipe } from '../search-filter-pipe';

@Component({
  selector: 'app-recherche-pharmacie',
  imports: [DatePipe, FormsModule, SearchFilterPipe],
  templateUrl: './recherche-pharmacie.html',
  styleUrl: './recherche-pharmacie.css'
})
export class RecherchePharmacie implements OnInit {
  pharmacies: Pharmacie[] = [];
  allPharmacies: Pharmacie[] = [];
  types: TypePharmacie[] = [];
  idTypeFiltre: number | undefined = undefined;
  searchTerm = '';

  constructor(private pharmacieService: PharmacieService) { }

  ngOnInit() {
    this.pharmacieService.listePharmacies().subscribe(phs => {
      this.allPharmacies = phs;
      this.pharmacies = phs;
    });
    this.pharmacieService.listeTypes().subscribe(t => {
      this.types = t._embedded.types;
    });
  }

  onChangeType(idType: number | undefined) {
    this.idTypeFiltre = idType;
    this.searchTerm = '';
    if (idType === undefined) {
      this.pharmacies = this.allPharmacies;
    } else {
      this.pharmacies = this.allPharmacies.filter(p => p.typePharmacie?.idType == idType);
    }
  }
}