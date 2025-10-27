import { inject, Injectable, signal } from '@angular/core';
import { IProduct, IResponse, ISearch } from '../interfaces';
import { BaseService } from './base-service';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService<IProduct> {
  protected override source: string = 'products';
  private productSignal = signal<IProduct[]>([]);
  
  get products$() {
    return this.productSignal;
  }

  public search: ISearch = { page: 1, size: 10 };
  public totalItems: any = [];
  private authService: AuthService = inject(AuthService);
  private alertService: AlertService = inject(AlertService);

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response: IResponse<IProduct[]>) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from(
          { length: this.search.totalPages ? this.search.totalPages : 0 }, 
          (_, i) => i + 1
        );
        this.productSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  // 🔁 Opción B: respeta addWithParams(params, data)
  save(item: IProduct, categoryId: number) {
    this.addWithParams({ categoryId }, item).subscribe({
      next: (response: IResponse<IProduct>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the product', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  // Mantén esto tal cual si tu BaseService tiene customEditWithParams(item, params)
  update(item: IProduct, categoryId: number) {
    this.customEditWithParams(item, { categoryId }).subscribe({
      next: (response: IResponse<IProduct>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the product', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(item: IProduct) {
    this.del(item.id).subscribe({
      next: (response: IResponse<IProduct>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the product', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }
}
