import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    closeMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
        const navbarCollapse = document.getElementById('navbarNav');
        // Only click the toggler if the menu is currently open
        if (navbarCollapse && navbarCollapse.classList.contains('show') && navbarToggler) {
            navbarToggler.click();
        }
    }
}
