import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { materialize } from 'rxjs';
import { NavBarComponent } from "./pages/auth/nav-bar/nav-bar.component";
declare var M: any; // Déclaration de M pour utiliser Materialize
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems); // Initialisation du sidenav
  }
  title = 'angular-firebase';
}
