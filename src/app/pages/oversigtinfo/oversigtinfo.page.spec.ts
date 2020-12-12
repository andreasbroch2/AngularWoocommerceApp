import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OversigtinfoPage } from './oversigtinfo.page';

describe('OversigtinfoPage', () => {
  let component: OversigtinfoPage;
  let fixture: ComponentFixture<OversigtinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OversigtinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OversigtinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
