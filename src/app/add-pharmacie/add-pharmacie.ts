import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pharmacie } from '../model/pharmacie.model';
import { TypePharmacie } from '../model/type-pharmacie.model';
import { PharmacieService } from '../services/pharmacie-service';

@Component({
  selector: 'app-add-pharmacie',
  imports: [FormsModule],
  templateUrl: './add-pharmacie.html',
  styleUrl: './add-pharmacie.css'
})
export class AddPharmacie implements OnInit {
  newPharmacie = new Pharmacie();
  types: TypePharmacie[] = [];
  idType!: number;

  constructor(
    private pharmacieService: PharmacieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pharmacieService.listeTypes().subscribe(t => {
      this.types = t._embedded.types;
    });
  }

  addPharmacie() {
    this.newPharmacie.typePharmacie = this.types.find(t => t.idType == this.idType)!;
    this.pharmacieService.ajouterPharmacie(this.newPharmacie).subscribe(() => {
      this.router.navigate(['pharmacies']);
    });
  }
}