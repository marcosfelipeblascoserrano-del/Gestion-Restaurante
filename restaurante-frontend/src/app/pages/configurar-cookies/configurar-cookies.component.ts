import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configurar-cookies',
  templateUrl: './configurar-cookies.component.html',
  styleUrls: ['./configurar-cookies.component.css']
})
export class ConfigurarCookiesComponent implements OnInit {
  analyticsCookies: boolean = false;
  marketingCookies: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      this.analyticsCookies = true;
      this.marketingCookies = true;
    } else if (consent === 'custom') {
      this.analyticsCookies = localStorage.getItem('cookieConsent_analytics') === 'true';
      this.marketingCookies = localStorage.getItem('cookieConsent_marketing') === 'true';
    }
  }

  savePreferences(): void {
    if (this.analyticsCookies && this.marketingCookies) {
      localStorage.setItem('cookieConsent', 'accepted');
    } else if (!this.analyticsCookies && !this.marketingCookies) {
      localStorage.setItem('cookieConsent', 'rejected');
    } else {
      localStorage.setItem('cookieConsent', 'custom');
      localStorage.setItem('cookieConsent_analytics', String(this.analyticsCookies));
      localStorage.setItem('cookieConsent_marketing', String(this.marketingCookies));
    }
    this.router.navigate(['/']);
  }
}
