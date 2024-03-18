import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListItem } from './shopping-list-item';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  newItem = ''
  shoppingList: ShoppingListItem[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.getShoppingList()
  }

  getShoppingList(): void {
    this.shoppingListService.getShoppingList().subscribe((data: any) => {
      console.log(data)
      this.shoppingList = data;
    });
  }
  updateItem(item: ShoppingListItem) {
    this.shoppingListService.updateItem(item.id, item).subscribe(() => {
      console.log('Item updated:', item);
    });
    console.log('Update item:', item);
  }
  deleteItem(item: ShoppingListItem) {
    this.shoppingListService.deleteItem(item.id).subscribe(() => {
      this.shoppingList = this.shoppingList.filter((i) => i !== item);
    });
  }
}

