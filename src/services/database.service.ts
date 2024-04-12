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
            "gender": "male",
            "reviews": []
          },
          {
            "firstName": "Jane",
            "lastName": "Smith",
            "dob": "2000-05-20",
            "schoolName": "McGill University",
            "gender": "female",
            "reviews": []
          },
          {
            "firstName": "Alex",
            "lastName": "Johnson",
            "dob": "2001-11-30",
            "schoolName": "University of British Columbia",
            "gender": "either",
            "reviews": []
          },
          {
            "firstName": "Emily",
            "lastName": "Brown",
            "dob": "2002-03-10",
            "schoolName": "University of Waterloo",
            "gender": "female",
            "reviews": [
              {
                "responsibility": 4,
                "cleanliness": 5,
                "friendliness": 3,
                "noise": 2,
                "petFriendly": true,
                "smoking": false
              }
            ]
          },
          {
            "firstName": "Michael",
            "lastName": "Davis",
            "dob": "2003-07-05",
            "schoolName": "University of Alberta",
            "gender": "male",
            "reviews": []
          },
          {
            "firstName": "Sarah",
            "lastName": "Wilson",
            "dob": "2004-09-25",
            "schoolName": "University of Ottawa",
            "gender": "either",
            "reviews": []
          },
          {
            "firstName": "David",
            "lastName": "Martinez",
            "dob": "2005-04-18",
            "schoolName": "University of Calgary",
            "gender": "male",
            "reviews": []
          },
          {
            "firstName": "Simon",
            "lastName": "Brubacher",
            "dob": "2001-06-10",
            "schoolName": "Conestoga College",
            "gender": "male",
            "reviews": [
              {
                "responsibility": 4,
                "cleanliness": 4,
                "friendliness": 5,
                "noise": 3,
                "petFriendly": true,
                "smoking": false
              }
            ]
          },
          {
            "firstName": "Noah",
            "lastName": "McCracken",
            "dob": "2003-04-06",
            "schoolName": "Wilfrid Laurier",
            "gender": "male",
            "reviews": []
          },
          {
            "firstName": "Kurt",
            "lastName": "Sialana",
            "dob": "1998-05-22",
            "schoolName": "Conestoga College",
            "gender": "male",
            "reviews": []
          },
          {
            "firstName": "Abby",
            "lastName": "Swartz",
            "dob": "2003-09-16",
            "schoolName": "Wilfrid Laurier",
            "gender": "female",
            "reviews": []
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
