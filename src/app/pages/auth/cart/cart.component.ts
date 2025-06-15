import { Component } from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  items: CartItem[] = [];
  get total() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeItem(productId: number) {
    this.items = this.items.filter(item => item.productId !== productId);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.items.find(i => i.productId === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
    }
  }
}
