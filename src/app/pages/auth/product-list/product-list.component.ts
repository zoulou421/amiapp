import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Student Laptop A',
      price: 499.99,
      description: 'Affordable laptop for students',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Student Laptop B',
      price: 699.99,
      description: 'Powerful laptop for development',
      imageUrl: 'https://via.placeholder.com/150'
    }
  ];
}
