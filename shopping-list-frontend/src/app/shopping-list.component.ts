import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListItem } from './shopping-list-item';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  shoppingList: ShoppingListItem[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.getShoppingList();
  }

  getShoppingList(): void {
    this.shoppingListService.getShoppingList().subscribe((data: any) => {
      this.shoppingList = data;
    });
  }
}
