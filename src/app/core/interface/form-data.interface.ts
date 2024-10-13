// form-data.interface.ts
export interface IFormData {
    id:string,
    name: string;               // Nom complet
    email: string;              // Email
    phone: string;              // Numéro de téléphone
    rendezvousDate: string;     // Date du rendez-vous (in string format 'YYYY-MM-DD')
    rendezvousTime: string;     // Heure du rendez-vous (in string format 'HH:MM')
    academicLevel: 'licence' | 'master';  // Licence or Master (Radio Button)
    objectif: string;           // Objectif du rendez-vous
    questions?: string;         // Optional questions supplémentaires
   // memoireFile: File | null;  // File can be null initially
    memoireFile: File | null; // Garde le fichier original
    fileUrl?: string; // Nouvelle propriété pour stocker l'URL
    //memoireFile: string | null; // Changez File en string
}