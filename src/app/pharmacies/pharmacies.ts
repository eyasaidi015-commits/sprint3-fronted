import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pharmacie } from '../model/pharmacie.model';
import { PharmacieService } from '../services/pharmacie-service';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-pharmacies',
  imports: [DatePipe, RouterLink],
  templateUrl: './pharmacies.html',
  styleUrl: './pharmacies.css'
})
export class Pharmacies implements OnInit {
  pharmacies = signal<Pharmacie[]>([]);

  constructor(
    private pharmacieService: PharmacieService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.chargerPharmacies();
  }

  chargerPharmacies() {
    this.pharmacieService.listePharmacies().subscribe({
      next: phs => {
        console.log('Reçu :', phs);
        this.pharmacies.set(Array.isArray(phs) ? phs : []);
      },
      error: err => console.error('Erreur API :', err)
    });
  }

  supprimerPharmacie(p: Pharmacie) {
    if (confirm('Voulez-vous vraiment supprimer cette pharmacie ?')) {
      this.pharmacieService.supprimerPharmacie(p.idPharmacie).subscribe(() => {
        this.chargerPharmacies();
      });
    }
  }
}