import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Dog } from './dog.model';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  firestore: Firestore = inject(Firestore);
  constructor(private http: HttpClient) {}

  getDataFromFirebase = (): {
    dogs: Observable<any>;
    employees: Observable<any>;
    changelogs: Observable<any>;
  } => {
    const dogData = collection(this.firestore, 'dogs');
    const employeeData = collection(this.firestore, 'employees');
    const changelogData = query(
      collection(this.firestore, 'changelog'),
      orderBy('timestamp', 'desc')
    );

    return {
      dogs: collectionData(dogData),
      employees: collectionData(employeeData),
      changelogs: collectionData(changelogData),
    };
  };

  //old
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

  updateChangelogFirebase = async (updatedDogInfo: Dog, employee: Employee) => {
    //creating the date format
    const currentDate = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const weekday = currentDate.getDay();
    const hour = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const formattedDate = `${daysOfWeek[weekday]} ${day} ${monthsOfYear[month]} ${hour}:${minutes} `;

    //creating the changelog object to send
    const newChangelog = {
      description: `${updatedDogInfo.name} was ${
        updatedDogInfo.present ? 'checked in' : 'checked out'
      } by ${employee.name}`,
      date: formattedDate,
      wasCheckedIn: updatedDogInfo.present,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(this.firestore, 'changelog'), newChangelog);
  };
}
