import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
  }

  db: any

  initDatabase(){
    this.createDatabase().then(data=>{
      console.log("Database created successfully: " + data)
    }).catch(e=>{
      console.log("Error in database creation: " + e.message)
    })
  }

  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("RoommateDB", 1);

      request.onerror = (event) => {
        console.error("Error in creating database!");
      };

      request.onsuccess = (event) => {
        console.log("onsuccess called");
        // @ts-ignore
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        console.log("onupgradeneeded called");
        // @ts-ignore
        this.db = event.target.result;
        const roommatesStore = this.db.createObjectStore("roommates", {
          keyPath: "id",
          autoIncrement: true,
        });

        const dummyData = [
          {
            "firstName": "John",
            "lastName": "Doe",
            "dob": "1999-01-15",
            "schoolName": "University of Toronto",
            "gender": "male"
          },
          {
            "firstName": "Jane",
            "lastName": "Smith",
            "dob": "2000-05-20",
            "schoolName": "McGill University",
            "gender": "female"
          },
          {
            "firstName": "Alex",
            "lastName": "Johnson",
            "dob": "2001-11-30",
            "schoolName": "University of British Columbia",
            "gender": "either"
          },
          {
            "firstName": "Emily",
            "lastName": "Brown",
            "dob": "2002-03-10",
            "schoolName": "University of Waterloo",
            "gender": "female"
          },
          {
            "firstName": "Michael",
            "lastName": "Davis",
            "dob": "2003-07-05",
            "schoolName": "University of Alberta",
            "gender": "male"
          },
          {
            "firstName": "Sarah",
            "lastName": "Wilson",
            "dob": "2004-09-25",
            "schoolName": "University of Ottawa",
            "gender": "either"
          },
          {
            "firstName": "David",
            "lastName": "Martinez",
            "dob": "2005-04-18",
            "schoolName": "University of Calgary",
            "gender": "male"
          },
          {
            "firstName": "Simon",
            "lastName": "Brubacher",
            "dob": "2001-06-10",
            "schoolName": "Conestoga College",
            "gender": "male"
          },
          {
            "firstName": "Noah",
            "lastName": "McCracken",
            "dob": "2003-04-06",
            "schoolName": "Wilford Laurier",
            "gender": "male"
          },
          {
            "firstName": "Kurt",
            "lastName": "Sialana",
            "dob": "1998-05-22",
            "schoolName": "Conestoga College",
            "gender": "male"
          },
          {
            "firstName": "Abby",
            "lastName": "Swartz",
            "dob": "2003-09-16",
            "schoolName": "Wilford Laurier",
            "gender": "female"
          }
        ];
        // @ts-ignore
        const transaction = event.target.transaction;
        const objectStore = transaction.objectStore("roommates");
        dummyData.forEach(roommate => {
          objectStore.add(roommate);
        });
      };
    });
  }
}
