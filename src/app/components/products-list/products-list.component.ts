import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../interfaces';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  @Input() productsList: IProduct[] = [];
  @Output() callEditMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
}