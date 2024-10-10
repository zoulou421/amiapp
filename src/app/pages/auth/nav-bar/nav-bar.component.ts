import { Component, OnInit } from '@angular/core';
declare var M: any; // Déclaration de M pour utiliser Materialize
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // Initialize Materialize Sidenav for mobile menu
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems);
  }

  logOut() {
    // Add your logout logic here
  }

}
