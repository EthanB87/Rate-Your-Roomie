import {inject, Injectable} from '@angular/core';
import {Account} from "../models/Account.Model";
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class AccountDalService {

  database = inject(DatabaseService)

  constructor() {

  }

  insert(account: Account): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["accounts"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const accountStore = transaction.objectStore("accounts");
      const req = accountStore.add(account);

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

  select(email: string | null | undefined, password: string | null | undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["accounts"]);

      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const accountStore = transaction.objectStore("accounts");
      const index = accountStore.index("email");

      const req = index.get(email);
      console.log(email);
      req.onsuccess = (event: any) => {
        const account = event.target.result;
        if (account && account.password === password) {
          resolve(account);
        } else {
          resolve(null);
        }
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }
}
