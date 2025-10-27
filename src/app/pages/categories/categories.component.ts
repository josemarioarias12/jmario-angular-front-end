import { Component, effect, inject } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CategoryService } from '../../services/categories.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CategoriesListComponent } from '../../components/categories-list/categories-list.component';
import { CategoriesFormComponent } from '../../components/categories-form/categories-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from '../../interfaces';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    PaginationComponent,
    LoaderComponent,
    CategoriesListComponent,
    CategoriesFormComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  public categoryService: CategoryService = inject(CategoryService);
  public fb: FormBuilder = inject(FormBuilder);
  public form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor() {
    this.categoryService.getAll();
    effect(() => {
      console.log('categories updated', this.categoryService.categories$());
    });
  }

  save(item: ICategory) {
    item.id ? this.categoryService.update(item) : this.categoryService.save(item);
    this.form.reset();
  }

  delete(item: ICategory) {
    console.log('delete', item);
    this.categoryService.delete(item);
  }
}