import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  newItem: any = {};
  itemImage: string = '';

  items: any[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  fetchItemImage(itemName: string) {
    this.shoppingListService
      .fetchImageFromUnsplash(itemName)
      .subscribe((imageUrl: string) => {
        this.itemImage = imageUrl;
      });
  }

  addItem() {
    this.shoppingListService
      .addItem(this.newItem)
      .subscribe((addedItem: any) => {
        this.items.push(addedItem);
        this.fetchItemImage(this.newItem.name);
        this.newItem = {};
      });
  }

  ngOnInit() {
    this.shoppingListService.getShoppingList().subscribe((data: any) => {
      this.items = data;
    });
  }
}
