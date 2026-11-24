import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecherchePharmacie } from './recherche-pharmacie';

describe('RecherchePharmacie', () => {
  let component: RecherchePharmacie;
  let fixture: ComponentFixture<RecherchePharmacie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecherchePharmacie],
    }).compileComponents();

    fixture = TestBed.createComponent(RecherchePharmacie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
