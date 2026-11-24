import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { pharmacieGuard } from './pharmacie-guard';

describe('pharmacieGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => pharmacieGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
