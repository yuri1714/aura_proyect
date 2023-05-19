import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCatalogueComponent } from './user-catalogue.component';

describe('UserCatalogueComponent', () => {
  let component: UserCatalogueComponent;
  let fixture: ComponentFixture<UserCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCatalogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
