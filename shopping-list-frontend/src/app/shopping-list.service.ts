import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingListItem } from './shopping-list-item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private http: HttpClient) {}

  getShoppingList() {
    return this.http.get(
      'mongodb+srv://DarkHelmet:Luggage12345@nodeexpressprojects.temhaj9.mongodb.net/shoppingList'
    );
  }

  addItem(item: any) {
    return this.http.post(
      'mongodb+srv://DarkHelmet:Luggage12345@nodeexpressprojects.temhaj9.mongodb.net/shoppingList',
      item
    );
  }

  updateItem(id: string, item: any) {
    return this.http.put(
      `'mongodb+srv://DarkHelmet:Luggage12345@nodeexpressprojects.temhaj9.mongodb.net/shoppingList'${id}`,
      item
    );
  }

  deleteItem(id: string) {
    return this.http.delete(
      `'mongodb+srv://DarkHelmet:Luggage12345@nodeexpressprojects.temhaj9.mongodb.net/shoppingList'${id}`
    );
  }

  fetchImageFromUnsplash(itemName: string) {
    const accessKey = 'your_access_key'; 'icZEMGqkOUFK9bG5jbN_tVXqo5vK9xz-3YaDGY7A4cc';
    const url = `https://api.unsplash.com/search/photos?query=${itemName}&client_id=${accessKey}`;

    return this.http
      .get(url)
      .pipe(map((response: any) => response.results[0]?.urls?.small));
  }
}
