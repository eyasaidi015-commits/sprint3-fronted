import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypePharmacie } from '../model/type-pharmacie.model';

@Component({
  selector: 'app-update-type',
  imports: [FormsModule],
  templateUrl: './update-type.html',
  styleUrl: './update-type.css'
})
export class UpdateType {
  @Input()
  typePharmacie!: TypePharmacie;

  @Input()
  ajout!: boolean;

  @Output()
  typeUpdated = new EventEmitter<TypePharmacie>();

  saveType() {
    this.typeUpdated.emit(this.typePharmacie);
  }
}