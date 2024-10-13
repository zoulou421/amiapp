import { Component, OnInit } from '@angular/core';
import { RendezvousService } from '../../../core/services/rendezvous-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rendezvous-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rendezvous-list.component.html',
  styleUrl: './rendezvous-list.component.css'
})
export class RendezvousListComponent implements OnInit {
  rendezvous: any[] = []; // Array to store rendezvous data
  loading: boolean = true; // Loading state

  constructor(private rendezvousService: RendezvousService) {}

  ngOnInit(): void {
    /* Fetch rendezvous data on component initialization
    this.rendezvousService.getRendezvous().subscribe(
      (data) => {
        this.rendezvous = data; // Store the fetched data
        this.loading = false; // Set loading to false after data is fetched
      },
      (error) => {
        console.error('Error fetching rendezvous data: ', error);
        this.loading = false; // Set loading to false on error
      }
    );*/
  }

}
