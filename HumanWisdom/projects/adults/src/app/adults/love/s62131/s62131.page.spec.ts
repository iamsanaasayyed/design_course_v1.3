import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { S62131Page } from './s62131.page';

describe('S62131Page', () => {
  // let  canActivate:[ActiveGuard],  
    let component: S62131Page;
  let fixture: ComponentFixture<S62131Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S62131Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(S62131Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
