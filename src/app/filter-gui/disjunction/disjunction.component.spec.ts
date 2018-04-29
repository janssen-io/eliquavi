import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisjunctionComponent } from './disjunction.component';

describe('DisjunctionComponent', () => {
  let component: DisjunctionComponent;
  let fixture: ComponentFixture<DisjunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisjunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisjunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
