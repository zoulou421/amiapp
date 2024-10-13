import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { materialize } from 'rxjs';
import { RendezvousListComponent } from "./pages/auth/rendezvous-list/rendezvous-list.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RendezvousListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'angular-firebase';
}
