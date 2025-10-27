import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../interfaces';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
  @Input() categoriesList: ICategory[] = [];
  @Output() callEditMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callDeleteMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
}