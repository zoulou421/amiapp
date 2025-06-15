import {Injectable, signal} from '@angular/core';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
// Signal Angular pour réactivité (Angular 18+)
  private _items = signal<CartItem[]>(this.loadCart());
  // Observable ou getter pour accéder aux items
  get items() {
    return this._items();
  }
  // Ajouter un produit au panier
  addItem(item: CartItem) {
    const items = [...this._items()];
    const index = items.findIndex(i => i.productId === item.productId);
    if (index > -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.updateCart(items);
  }

  // Supprimer un produit du panier
  removeItem(productId: number) {
    const items = this._items().filter(i => i.productId !== productId);
    this.updateCart(items);
  }

  // Mettre à jour la quantité d’un produit
  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const items = [...this._items()];
    const index = items.findIndex(i => i.productId === productId);
    if (index > -1) {
      items[index].quantity = quantity;
      this.updateCart(items);
    }
  }

  // Vider le panier
  clearCart() {
    this.updateCart([]);
  }

  // Calculer le total
  getTotal(): number {
    return this._items().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Sauvegarder dans localStorage et mettre à jour le signal
  private updateCart(items: CartItem[]) {
    this._items.set(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }

  // Charger le panier depuis localStorage
  private loadCart(): CartItem[] {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }
}
