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
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Dog } from './dog.model';
import { Employee } from './employee.model';
import { Changelog } from './changelog.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  firestore: Firestore = inject(Firestore);

  getDataFromFirebase = async (): Promise<{
    dogData: Dog[];
    employeeData: Employee[];
    changelogData: Changelog[];
  }> => {
    let dogData: any = null;
    let employeeData: any = null;
    let changelogData: any = null;
    const dogDoc = await getDoc(doc(this.firestore, 'DoggyDaycare', 'dogs'));
    const employeeDoc = await getDoc(
      doc(this.firestore, 'DoggyDaycare', 'employees')
    );
    const changelogDoc = await getDoc(
      doc(this.firestore, 'DoggyDaycare', 'changelogs')
    );

    if (dogDoc.exists()) {
      const docData = dogDoc.data();
      dogData = docData['dogs'];
    }
    if (employeeDoc.exists()) {
      const docData = employeeDoc.data();
      employeeData = docData['employees'];
    }
    if (changelogDoc.exists()) {
      const docData = changelogDoc.data();
      changelogData = docData['changelogs'];
    }
    return {
      dogData: dogData,
      employeeData: employeeData,
      changelogData: changelogData,
    };
  };

  //update dog info
  changeFirebaseDogInfo = async (updatedDogInfo: Dog) => {
    let dogs: Dog[] = [];

    //get the document
    const dogDoc = await getDoc(doc(this.firestore, 'DoggyDaycare', 'dogs'));
    if (dogDoc.exists()) {
      //translate the data
      const dogData = dogDoc.data();

      dogs = dogData['dogs'];

      //find the dog with the change
      const dogIndex = dogs.findIndex(
        (dog) => dog.chipNumber == updatedDogInfo.chipNumber
      );

      //if dog was found, update the information in dog array
      if (dogIndex !== -1) {
        dogs[dogIndex] = updatedDogInfo;
      }
    }

    //update the array in the document
    await updateDoc(doc(this.firestore, 'DoggyDaycare', 'dogs'), {
      dogs: dogs,
    });
  };

  updateChangelogFirebase = async (updatedChangelog: Changelog[]) => {
    await updateDoc(doc(this.firestore, 'DoggyDaycare', 'changelogs'), {
      changelogs: updatedChangelog,
    });
  };

  addNewDogFirebase = async (currentDogs: Dog[], newDog: Dog) => {
    let updatedDogs: Dog[] = currentDogs;

    updatedDogs.unshift(newDog);
    console.log(updatedDogs);
    await updateDoc(doc(this.firestore, 'DoggyDaycare', 'dogs'), {
      dogs: updatedDogs,
    });
  };

  removeDogFirebase = async (updatedDogs: Dog[]) => {
    await updateDoc(doc(this.firestore, 'DoggyDaycare', 'dogs'), {
      dogs: updatedDogs,
    });
  };
}
