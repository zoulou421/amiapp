import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

interface FaqItem {
  question: string;
  answer: string;
  open?: boolean;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [],
  templateUrl: './faq-section.component.html',
  styleUrls:  ['./faq-section.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({ height: '*', opacity: 1, padding: '1rem' })),
      state('closed', style({ height: '0px', opacity: 0, padding: '0 1rem' })),
      transition('closed <=> open', [
        animate('350ms cubic-bezier(.4,0,.2,1)')
      ])
    ])
  ]
})
export class FaqSectionComponent {
  faqs = [
    {
      question: "Comment fonctionne AMI ?",
      answer: "AMI vous accompagne dans toutes les étapes de votre mémoire : choix du sujet, méthodologie, rédaction, etc.",
      open: false
    },
    {
      question: "Est-ce gratuit ?",
      answer: "Oui, l’accès aux conseils et ressources de base est gratuit. Certains services avancés peuvent être payants.",
      open: false
    }
    // Ajoute d'autres questions ici
  ];

  toggle(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
