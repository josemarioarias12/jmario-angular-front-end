import { Component, effect, inject } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ProductService } from '../../services/products.service';
import { CategoryService } from '../../services/categories.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductsListComponent } from '../../components/products-list/products-list.component';
import { ProductsFormComponent } from '../../components/products-form/products-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    PaginationComponent,
    LoaderComponent,
    ProductsListComponent,
    ProductsFormComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public productService: ProductService = inject(ProductService);
  public categoryService: CategoryService = inject(CategoryService);
  public fb: FormBuilder = inject(FormBuilder);
  public form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: [''],
    price: [0, Validators.required],
    stock: [0, Validators.required],
    categoryId: ['', Validators.required]
  })

  constructor() {
    this.productService.getAll();
    this.categoryService.getAll();
    effect(() => {
      console.log('products updated', this.productService.products$());
      console.log('categories updated', this.categoryService.categories$());
    });
  }

  save(formValue: any) {
    const categoryId = Number(formValue.categoryId);
    const product: IProduct = {
      id: formValue.id,
      name: formValue.name,
      description: formValue.description,
      price: formValue.price,
      stock: formValue.stock
    };

    if (formValue.id) {
      this.productService.update(product, categoryId);
    } else {
      this.productService.save(product, categoryId);
    }
    this.form.reset();
  }

  edit(item: IProduct) {
    this.form.patchValue({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      categoryId: item.category?.id?.toString() || ''
    });
  }

  delete(item: IProduct) {
    console.log('delete', item);
    this.productService.delete(item);
  }
}