import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Dog } from './dog.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  firestore: Firestore = inject(Firestore);
  constructor(private http: HttpClient) {}

  getDataFromFirebase = (): {
    dogs: Observable<any>;
    employees: Observable<any>;
  } => {
    const dogData = collection(this.firestore, 'dogs');
    const employeeData = collection(this.firestore, 'employees');

    return {
      dogs: collectionData(dogData),
      employees: collectionData(employeeData),
    };
  };

  getDataFromDB = () => {
    return this.http.get('assets/db.json');
  };

  changeFirebaseDogInfo = async (updatedDogInfo: Dog) => {
    //do a query search for dog matching the chipnumber
    const q = query(
      collection(this.firestore, 'dogs'),
      where('chipNumber', '==', updatedDogInfo.chipNumber)
    );

    //get the docID of the dog that matched it
    const dogQuery = await getDocs(q);
    const dogDocumentID = dogQuery.docs[0].id;

    //replace the whole document with the updated dog info
    await setDoc(doc(this.firestore, 'dogs', dogDocumentID), updatedDogInfo);
  };
}
