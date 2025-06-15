import {Component, HostListener, inject, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { SujetMemoireComponent } from '../sujet-memoire/sujet-memoire.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IFormData } from '../../../core/interface/form-data.interface';
import { RendezvousService } from '../../../core/services/rendezvous-service';
import {CommonModule} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {animate, style, transition, trigger} from "@angular/animations";
import {AppVideoPresentationComponent} from "../app-video-presentation/app-video-presentation.component";
import {FaqSectionComponent} from "../faq-section/faq-section.component";

declare var M: any; // Declare Materialize CSS
interface FaqItem {
  question: string;
  answer: string;
  category: string;
  open?: boolean;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatToolbarModule, MatButtonModule, RouterLink, AppVideoPresentationComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //ajout
  /*animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]*/
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
  //fin ajout
})
export class HomeComponent implements OnInit {
  formData!: FormGroup;
  private fb = inject(FormBuilder);
  private rendezvousService = inject(RendezvousService);
  private snackBar = inject(MatSnackBar);
  // Références aux couches
  private layers!: HTMLElement[];

  ngAfterViewInit() {
    // Initialize the sidenav
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);

    //this.layers = Array.from(document.querySelectorAll('.parallax-layer')) as HTMLElement[];
    this.layers = Array.from(document.querySelectorAll('.parallax-layer')) as HTMLElement[];
  }

  /* @HostListener('window:scroll', ['$event'])
 onWindowScroll() {
   const scrollTop = window.pageYOffset;
   this.layers.forEach((layer, index) => {
     const depth = (index + 1) * 15;
     const movement = scrollTop * depth / 100;
     layer.style.transform = `translateY(${movement}px) translateZ(${-(index + 1) * 150}px) scale(${1 + index * 0.15})`;
   });
 }

@HostListener('document:mousemove', ['$event'])
 onMouseMove(event: MouseEvent) {
   const centerX = window.innerWidth / 2;
   const centerY = window.innerHeight / 2;
   const percentX = (event.clientX - centerX) / centerX;
   const percentY = (event.clientY - centerY) / centerY;

   this.layers.forEach((layer, index) => {
     const movementX = percentX * (index + 1) * 10;
     const movementY = percentY * (index + 1) * 10;
     layer.style.transform += ` translateX(${movementX}px) translateY(${movementY}px)`;
   });
 }*/
  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollTop = window.pageYOffset;
    this.layers.forEach((layer, index) => {
      const depth = (index + 1) * 15;
      const movement = scrollTop * depth / 100;
      layer.style.transform = `translateY(${movement}px) translateZ(${-(index + 1) * 150}px) scale(${1 + index * 0.15})`;
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.layers) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const percentX = (event.clientX - centerX) / centerX;
    const percentY = (event.clientY - centerY) / centerY;

    this.layers.forEach((layer, index) => {
      const movementX = percentX * (index + 1) * 10;
      const movementY = percentY * (index + 1) * 10;
      layer.style.transform += ` translateX(${movementX}px) translateY(${movementY}px)`;
    });
  }

  formObject: IFormData = {
    id: '',
    name: '',
    email: '',
    phone: '',
    rendezvousDate: '',
    rendezvousTime: '',
    academicLevel: 'licence',
    objectif: '',
    questions: '',
    memoireFile: null
  };

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      rendezvousDate: ['', [Validators.required]],
      rendezvousTime: ['', [Validators.required]],
      academicLevel: ['licence', [Validators.required]],
      objectif: ['', [Validators.required]],
      questions: [''],
      memoireFile: [null]
    });
  }

  private _router = inject(Router);
  private authservice = inject(AuthService);

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/login-in');
    } catch (error) {
      console.log(error);
    }
  }

  // Method to handle file input changes with validation for allowed formats
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      // Validate file type
      if (allowedTypes.includes(file.type)) {
        this.formData.patchValue({ memoireFile: file });
      } else {
        this.snackBar.open('Type de fichier non autorisé! Formats acceptés: PDF, JPG, PNG, DOCX.', 'Fermer', { duration: 3000 });
        this.formData.patchValue({ memoireFile: null }); // Reset file input
      }
    }
  }

  submitForm(): void {
    if (this.formData.valid) {
      console.log(this.formData.value);

      this.rendezvousService.addRendezvous(this.formData.value).then(() => {
        console.log('Data successfully written to Firestore');
        this.snackBar.open('Rendez-vous enregistré avec succès!', 'Fermer', {
          duration: 5000,
          panelClass: ['custom-snackbar'] // Apply the custom class here
        });
        this.formData.reset();
      }).catch((error) => {
        console.error('Error writing document: ', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  testimonials = [
    {
      name: 'Fatou S.',
      feedback: 'Grâce à AMI, mon mémoire a été validé du premier coup !',
      date: 'Mai 2024'
    },
    {
      name: 'Moussa D.',
      feedback: 'L’accompagnement personnalisé est vraiment un plus.',
      date: 'Avril 2024'
    },
    {
      name: 'Awa N.',
      feedback: 'J’ai trouvé mon sujet de mémoire en moins d’une semaine.',
      date: 'Mars 2024'
    }
    // Ajoute d’autres témoignages si besoin
  ];


  subscribeNewsletter() {
    M.toast({ html: 'Merci pour votre abonnement à la newsletter ! 🙌', classes: 'rounded purple darken-3 white-text' });
  }

  faqs: FaqItem[] = [
    { question: "Comment fonctionne AMI ?", answer: "AMI vous accompagne dans toutes les étapes de votre mémoire : choix du sujet, méthodologie, rédaction, etc.", category: "Général", open: false },
    { question: "Est-ce gratuit ?", answer: "Oui, l’accès aux conseils et ressources de base est gratuit. Certains services avancés peuvent être payants.", category: "Tarifs", open: false },
    { question: "Puis-je obtenir un accompagnement personnalisé ?", answer: "Oui, AMI propose un accompagnement individuel avec des experts pour maximiser vos chances de réussite.", category: "Support", open: false },
    { question: "Comment prendre rendez-vous ?", answer: "Rendez-vous sur la section dédiée, choisissez une date et remplissez le formulaire. Vous recevrez une confirmation par email.", category: "Général", open: false },
    { question: "Quelles thématiques de mémoire sont couvertes ?", answer: "Toutes les thématiques en informatique : développement web, IA, réseaux, cybersécurité, data science, etc.", category: "Général", open: false },
    { question: "Quels sont les délais pour recevoir de l’aide ?", answer: "Les réponses sont généralement fournies sous 48 heures ouvrées.", category: "Support", open: false },
    { question: "Comment se déroule l’accompagnement ?", answer: "Via des sessions en ligne, documents partagés, et échanges par email ou chat.", category: "Support", open: false },
    { question: "Puis-je annuler un rendez-vous ?", answer: "Oui, jusqu’à 24 heures avant la date prévue sans frais.", category: "Support", open: false },
    { question: "Quels sont les tarifs des services avancés ?", answer: "Les tarifs varient selon la prestation, consultez notre page tarifs pour plus de détails.", category: "Tarifs", open: false },
    { question: "Comment puis-je payer ?", answer: "Nous acceptons les paiements par carte bancaire, PayPal et virement bancaire.", category: "Tarifs", open: false },
    { question: "Y a-t-il une garantie de satisfaction ?", answer: "Oui, nous proposons une garantie de remboursement sous 7 jours si vous n’êtes pas satisfait.", category: "Tarifs", open: false },
    { question: "Puis-je accéder aux ressources gratuitement ?", answer: "Oui, plusieurs guides et tutoriels sont disponibles gratuitement sur notre site.", category: "Général", open: false },
    { question: "Comment sécurisez-vous mes données ?", answer: "Nous utilisons des protocoles de sécurité avancés et ne partageons jamais vos données personnelles.", category: "Sécurité", open: false },
    { question: "Puis-je collaborer avec d’autres étudiants ?", answer: "Oui, nous proposons des forums et groupes d’entraide pour favoriser la collaboration.", category: "Communauté", open: false },
    { question: "Quels formats de documents sont acceptés ?", answer: "Nous acceptons les formats Word, PDF, et LaTeX.", category: "Général", open: false },
    { question: "Comment soumettre mon mémoire pour relecture ?", answer: "Vous pouvez uploader votre document via votre espace personnel sécurisé.", category: "Support", open: false },
    { question: "Combien de relectures sont incluses ?", answer: "Deux relectures sont incluses dans les forfaits standards.", category: "Tarifs", open: false },
    { question: "Puis-je demander une correction urgente ?", answer: "Oui, un service express est disponible moyennant un supplément.", category: "Tarifs", open: false },
    { question: "Comment puis-je contacter le support ?", answer: "Par email, téléphone ou chat en direct pendant les heures ouvrées.", category: "Support", open: false },
    { question: "Offrez-vous des formations ?", answer: "Oui, des formations en ligne sur la méthodologie et la rédaction sont proposées.", category: "Formation", open: false },
    { question: "Puis-je accéder à mon historique d’accompagnement ?", answer: "Oui, tout est accessible depuis votre espace personnel.", category: "Général", open: false },
    { question: "Comment modifier mes informations personnelles ?", answer: "Dans votre profil utilisateur, vous pouvez modifier vos données à tout moment.", category: "Général", open: false },
    { question: "Quels sont les horaires d’ouverture ?", answer: "Du lundi au vendredi, de 9h à 18h.", category: "Support", open: false },
    { question: "Proposez-vous des offres pour les groupes ?", answer: "Oui, des tarifs préférentiels sont disponibles pour les groupes d’étudiants.", category: "Tarifs", open: false },
    { question: "Puis-je résilier mon abonnement ?", answer: "Oui, à tout moment via votre espace client.", category: "Tarifs", open: false },
    { question: "Comment fonctionne la confidentialité ?", answer: "Toutes vos données et travaux sont strictement confidentiels.", category: "Sécurité", open: false },
    { question: "Puis-je accéder à la FAQ sur mobile ?", answer: "Oui, notre site est entièrement responsive et accessible sur tous les appareils.", category: "Général", open: false },
    { question: "Comment proposer une nouvelle question ?", answer: "Vous pouvez nous contacter via le formulaire de contact pour suggérer des questions.", category: "Général", open: false },
    { question: "Quelles sont les conditions générales ?", answer: "Elles sont disponibles en bas de page et dans votre espace client.", category: "Général", open: false },
    { question: "Comment suivre l’avancement de mon mémoire ?", answer: "Nous proposons un tableau de bord personnalisé pour suivre vos progrès.", category: "Support", open: false },
    { question: "Puis-je partager mon compte ?", answer: "Non, chaque compte est personnel et non transférable.", category: "Sécurité", open: false }
  ];
  categories: string[] = ['Toutes', 'Général', 'Tarifs', 'Support', 'Sécurité', 'Formation', 'Communauté'];

  selectedCategory = 'Toutes';
  searchTerm = '';

  get filteredFaqs() {
    return this.faqs.filter(faq => {
      const matchesCategory = this.selectedCategory === 'Toutes' || faq.category === this.selectedCategory;
      const matchesSearch = faq.question.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  toggle(index: number) {
    this.filteredFaqs[index].open = !this.filteredFaqs[index].open;
  }


  teamMembers = [
    {
      name: 'Brynda Mandelou',
      role: 'Responsable Des Départements',
      photo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj9atmZx-4VBrpdLkbYapBNdoM2Cwsu4ri0xGxNpcwv133tUOSYwZAJIC7JbJxDDRmkpSguGoqrNhyphenhyphenzQXWJWss0qoleQi3cKFdY8RRD0XFyI6M34GLqHbuN_5Z1Fr2jzQHx8c234IYMVjHgMkbskcOKnu99LCBovIZJie-rryNV1kjKT0CvEUn2R1iwAds/s320/5931768264831126204-removebg-preview.png'
    },
    {
      name: 'Bonevy BEBY',
      role: 'Instructeur/Coach & Ceo',
      photo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDB4S8F3yeAVrAtATgWpXxXYDmzM5-nHZpxLp49eBIohZ8i4Gv0hQO5Enjzk3GqXU5zQp-QA53bM3Rxi5_UQrpwoRTjXooCwI2N5uZ0GAypS-z1-bAuSo9tqI7VQlHYFQRgte9F7MtJxZfqEsg1_dcLT4898XImnPfkeNCFQ4CS8G5tp4iV8M2VZ0mMvI/s320/profile1.png'
    },
    {
      name: 'Sophie Martin',
      role: 'Ambassadrice',
      photo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiT-VQgPRPHmBsYkDwO4Gb5-kIi4-KOIjCy9GclrABMHEZ9yX2T6WrxsZwr8InL53gNgeOLNxXEMOC25NWteZShEjsT3yhiJaZudonFQTtJwOzL2nwOo1XBt1rA1pOjHXfDRwFN5mjBFYhY_x2kASyWSlS5huD5nZM9dNMAgKICUASUrYGeebSwOIhFdlE/s320/Sophie-Martin-Complete-Pilates-01-removebg-preview.png'
    }
    // Ajoute d’autres membres ici
  ];

  projects = [
    { title: 'Projet AMI', description: 'Plateforme d’accompagnement pour les mémoires en informatique.' },
    { title: 'Projet XYZ', description: 'Application mobile innovante pour la gestion de tâches.' },
    { title: 'Projet ABC', description: 'Outil collaboratif pour les équipes de développement.' }
  ];


  isModalOpen = false;

  sujetsMemoire = [
    '1.Développement d’une application mobile éducative',
    '2.Analyse des algorithmes de tri avancés',
    '3.Sécurité des systèmes d’information',
    '4.Intelligence artificielle pour la reconnaissance vocale',
    '5.Optimisation des bases de données NoSQL',
    // Ajoute d’autres suggestions ici
  ];

  openModal(event: Event) {
    event.preventDefault();
    this.isModalOpen = true;
  }

  closeModal(event: Event) {
    event.preventDefault();
    this.isModalOpen = false;
  }

}
