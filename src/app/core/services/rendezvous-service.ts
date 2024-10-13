import { Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore, getDocs } from '@angular/fire/firestore';
import { IFormData } from '../interface/form-data.interface';
import { Observable, from, map } from 'rxjs';
//import { getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

import { getDownloadURL, ref, uploadBytes, getStorage } from '@angular/fire/storage'; // Changez l'import ici
import { Storage } from '@angular/fire/storage'; // Assurez-vous d'importer Storage


@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  private rendezvousCollection!: CollectionReference<any>;

  constructor(private firestore: Firestore, private storage: Storage) {
    // Initialisez la collection rendezvous
    this.rendezvousCollection = collection(this.firestore, 'rendezvous');
  }

  // Méthode pour ajouter un rendez-vous à Firestore
  /*async addRendezvous(data: IFormData): Promise<void> {
    // Vérifiez si un fichier est fourni
    if (data.memoireFile) {
      const fileRef = ref(this.storage, `memoireFiles/${data.memoireFile.name}`);
      try {
        // Téléchargez le fichier sur Firebase Storage
        await uploadBytes(fileRef, data.memoireFile);
        // Récupérez l'URL de téléchargement du fichier
        const fileURL = await getDownloadURL(fileRef);
        // Ajoutez l'URL du fichier aux données avant de l'enregistrer dans Firestore
        data.memoireFile = fileURL; // Mettez à jour la propriété avec l'URL
      } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('File upload failed');
      }
    } else {
      data.memoireFile = null; // Assurez-vous que cette propriété existe même sans fichier
    }

    try {
      await addDoc(this.rendezvousCollection, data);
      console.log('Rendezvous added successfully');
    } catch (error) {
      console.error('Error adding rendezvous:', error);
      throw new Error('Failed to add rendezvous');
    }
  }

  // Méthode pour récupérer les données des rendez-vous depuis Firestore
  getRendezvous(): Observable<any[]> {
    return from(getDocs(this.rendezvousCollection)).pipe(
      map((snapshot) => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }*/

    /*async addRendezvous(data: IFormData): Promise<void> {
      const storage = getStorage(); // Obtenez l'instance de FirebaseStorage
      if (data.memoireFile) {
        const fileRef = ref(storage, `memoireFiles/${data.memoireFile.name}`);
        try {
          await uploadBytes(fileRef, data.memoireFile);
          const fileURL = await getDownloadURL(fileRef);
          data.fileUrl = fileURL; // Mettez l'URL dans la nouvelle propriété
        } catch (error) {
          console.error('Error uploading file:', error);
          throw new Error('File upload failed');
        }
      } else {
        data.memoireFile = null; // Assurez-vous que cette propriété existe même sans fichier
      }
    
      try {
        await addDoc(this.rendezvousCollection, data);
        console.log('Rendezvous added successfully');
      } catch (error) {
        console.error('Error adding rendezvous:', error);
        throw new Error('Failed to add rendezvous');
      }
    }*/


    // Upload file to Firebase Storage
  async uploadFile(file: File): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, 'uploads/' + file.name);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url; // Return the file URL
  }

  // Add rendezvous to Firestore
  async addRendezvous(data: any): Promise<void> {
    const url = await this.uploadFile(data.memoireFile); // Assuming `memoireFile` is the File object
    await addDoc(collection(this.firestore, 'rendezvous'), { ...data, memoireFile: url }); // Store the URL instead of File
  }

    
}