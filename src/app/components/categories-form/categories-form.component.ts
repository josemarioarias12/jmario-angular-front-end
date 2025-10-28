import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICategory } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.scss'
})
export class CategoriesFormComponent {
  @Input() form!: FormGroup;
  @Input() isEdit: boolean = false;
  @Output() callSaveMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  
  public authService: AuthService = inject(AuthService);
  
  get isSuperAdmin(): boolean {
    return this.authService.isSuperAdmin();
  }
}