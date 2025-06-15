import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: Product | undefined;
  products: Product[] = [
    {
      id: 1,
      name: 'Student Laptop A',
      price: 499.99,
      description: 'Affordable laptop for students',
      imageUrl: 'https://via.placeholder.com/300'
    },
    {
      id: 2,
      name: 'Student Laptop B',
      price: 699.99,
      description: 'Powerful laptop for development',
      imageUrl: 'https://via.placeholder.com/300'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === id);
    if (!this.product) {
      this.router.navigate(['/']);
    }
  }

  addToCart() {
    // Implémenter l’ajout au panier (ex: via un service)
    alert(`Added ${this.product?.name} to cart!`);
  }
}
