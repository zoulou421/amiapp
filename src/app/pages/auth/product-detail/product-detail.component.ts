import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CartItem, CartService} from "../../../services/cart.service";

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
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product: Product | undefined;
  quantity: number = 1;

  // Mock product list; en vrai, charge depuis un service ou Firestore
  products: Product[] = [
    {
      id: 1,
      name: 'Student Laptop A',
      price: 499.99,
      description: 'Affordable laptop for students',
      imageUrl: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      name: 'Student Laptop B',
      price: 699.99,
      description: 'Powerful laptop for development',
      imageUrl: 'https://via.placeholder.com/300',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find((p) => p.id === id);
    if (!this.product) {
      // Redirige vers la liste si produit non trouvé
      this.router.navigate(['/']);
    }
  }

  addToCart() {
    if (!this.product) return;
    if (this.quantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }
    const item: CartItem = {
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: this.quantity,
    };
    this.cartService.addItem(item);
    alert(`${this.product.name} added to cart!`);
  }
}
