import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProduct, ICategory } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {
  @Input() form!: FormGroup;
  @Input() isEdit: boolean = false;
  @Input() categories: ICategory[] = [];
  @Output() callSaveMethod: EventEmitter<any> = new EventEmitter<any>();
  
  public authService: AuthService = inject(AuthService);
  
  get isSuperAdmin(): boolean {
    return this.authService.isSuperAdmin();
  }
}