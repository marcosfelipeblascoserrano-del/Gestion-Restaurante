import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarCookiesComponent } from './configurar-cookies.component';

describe('ConfigurarCookiesComponent', () => {
  let component: ConfigurarCookiesComponent;
  let fixture: ComponentFixture<ConfigurarCookiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurarCookiesComponent]
    });
    fixture = TestBed.createComponent(ConfigurarCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
