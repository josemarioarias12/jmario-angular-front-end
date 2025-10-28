import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ICategory } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

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
  
  public authService: AuthService = inject(AuthService);
  
  get isSuperAdmin(): boolean {
    return this.authService.isSuperAdmin();
  }
}