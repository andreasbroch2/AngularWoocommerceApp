import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KategorierPage } from './kategorier.page';

describe('KategorierPage', () => {
  let component: KategorierPage;
  let fixture: ComponentFixture<KategorierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategorierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KategorierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
