import {inject, Injectable} from '@angular/core';
import {Roommate} from "../models/Roommate.Model";
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class RoommateDALService {

  database = inject(DatabaseService)

  constructor() {

  }

  insert(roommate: Roommate): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["roommates"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const roommateStore = transaction.objectStore("roommates");
      const req = roommateStore.add(roommate);

      req.onsuccess = (event: any) => {
        console.log(`Success: review added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  selectAll(): Promise<Roommate[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["roommates"], "readonly");

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };

      transaction.onerror = (event: any) => {
        console.error("Error: error in selectAll transaction:", event.target.error);
        reject(event.target.error);
      };

      const roommateStore = transaction.objectStore("roommates");
      const roommateCursor = roommateStore.openCursor();
      const roommates: Roommate[] = [];

      roommateCursor.onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          console.log(`Name ${cursor.key} is ${cursor.value}`);
          roommates.push(cursor.value);
          cursor.continue();
        } else {
          console.log("No more entries!");
          resolve(roommates);
        }
      };

      roommateCursor.onerror = (event: any) => {
        console.error("Error: error in cursor iteration:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  select(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["roommates"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const roommatesStore = transaction.objectStore("roommates");

      const req = roommatesStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });

  }

  update(roommate: Roommate): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["roommates"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const roommateStore = transaction.objectStore("roommates");

      const reqUpdate = roommateStore.put(roommate);

      reqUpdate.onsuccess = (event: any) => {
        console.log(`Success: data updated successfully: ${event}`);
        resolve(event);
      };

      reqUpdate.onerror = (event: any) => {
        console.log(`Error: failed to update: ${event}`);
        reject(event)
      };
    });
  }

  delete(roommate: Roommate): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["roommates"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const roommateStore = transaction.objectStore("roommates");
      if (roommate.id) {
        const reqDelete = roommateStore.delete(roommate.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("roommate does not have id")
      }
    });
  }
}
