import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pharmacie } from '../model/pharmacie.model';
import { TypePharmacie } from '../model/type-pharmacie.model';
import { TypeWrapper } from '../model/type-wrapper.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PharmacieService {

  apiURL: string = 'http://localhost:8090/pharmacies/api';
  apiURLType: string = 'http://localhost:8090/pharmacies/types';

  constructor(private http: HttpClient) { }

  listePharmacies(): Observable<Pharmacie[]> {
    return this.http.get<Pharmacie[]>(this.apiURL);
  }

  ajouterPharmacie(pharm: Pharmacie): Observable<Pharmacie> {
    return this.http.post<Pharmacie>(this.apiURL, pharm, httpOptions);
  }

  supprimerPharmacie(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterPharmacie(id: number): Observable<Pharmacie> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Pharmacie>(url);
  }

  updatePharmacie(pharm: Pharmacie): Observable<Pharmacie> {
    return this.http.put<Pharmacie>(this.apiURL, pharm, httpOptions);
  }

  listeTypes(): Observable<TypeWrapper> {
    return this.http.get<TypeWrapper>(this.apiURLType);
  }

  ajouterType(nom: string): Observable<TypePharmacie> {
    return this.http.post<TypePharmacie>(this.apiURLType, { nomType: nom }, httpOptions);
  }

  updateType(type: TypePharmacie): Observable<TypePharmacie> {
    const url = `${this.apiURLType}/${type.idType}`;
    return this.http.put<TypePharmacie>(url, type, httpOptions);
  }

  supprimerType(id: number) {
    const url = `${this.apiURLType}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}