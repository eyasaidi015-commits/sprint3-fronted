import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pharmacie } from '../model/pharmacie.model';
import { TypePharmacie } from '../model/type-pharmacie.model';
import { PharmacieService } from '../services/pharmacie-service';

@Component({
  selector: 'app-update-pharmacie',
  imports: [FormsModule],
  templateUrl: './update-pharmacie.html',
  styleUrl: './update-pharmacie.css'
})
export class UpdatePharmacie implements OnInit {
  currentPharmacie = new Pharmacie();
  dateOuvertureStr = '';
  types: TypePharmacie[] = [];
  idType!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pharmacieService: PharmacieService
  ) { }

  ngOnInit() {
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.pharmacieService.listeTypes().subscribe(t => {
      this.types = t._embedded.types;
    });
    this.pharmacieService.consulterPharmacie(id).subscribe(p => {
      this.currentPharmacie = p;
      this.idType = p.typePharmacie.idType;
      this.dateOuvertureStr = new Date(p.dateOuverture).toISOString().substring(0, 10);
    });
  }

  updatePharmacie() {
    this.currentPharmacie.dateOuverture = new Date(this.dateOuvertureStr);
    this.currentPharmacie.typePharmacie = this.types.find(t => t.idType == this.idType)!;
    this.pharmacieService.updatePharmacie(this.currentPharmacie).subscribe(() => {
      this.router.navigate(['pharmacies']);
    });
  }
}