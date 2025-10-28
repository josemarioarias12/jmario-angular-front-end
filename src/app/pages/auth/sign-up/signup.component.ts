import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IUser } from '../../../interfaces';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SigUpComponent {
  public signUpError!: String;
  public validSignup!: boolean;
  @ViewChild('name') nameModel!: NgModel;
  @ViewChild('lastname') lastnameModel!: NgModel;
  @ViewChild('email') emailModel!: NgModel;
  @ViewChild('password') passwordModel!: NgModel;
  @ViewChild('roleId') roleIdModel!: NgModel;

  public selectedRoleId: number = 2; // Variable separada para el roleId

  public user: IUser = {};

  public roles = [
    { id: 1, name: 'SUPER_ADMIN', label: 'Super Admin' },
    { id: 2, name: 'USER', label: 'User' }
  ];

  constructor(
    private router: Router, 
    private authService: AuthService
  ) {}

  public handleSignup(event: Event) {
    event.preventDefault();
    if (!this.nameModel.valid) {
      this.nameModel.control.markAsTouched();
    }
    if (!this.lastnameModel.valid) {
      this.lastnameModel.control.markAsTouched();
    }
    if (!this.emailModel.valid) {
      this.emailModel.control.markAsTouched();
    }
    if (!this.passwordModel.valid) {
      this.passwordModel.control.markAsTouched();
    }
    if (!this.roleIdModel.valid) {
      this.roleIdModel.control.markAsTouched();
    }
    
    if (
      this.nameModel.valid && 
      this.lastnameModel.valid && 
      this.emailModel.valid && 
      this.passwordModel.valid &&
      this.roleIdModel.valid
    ) {
      // Construir el objeto user con el roleId correcto
      const userToSend = {
        name: this.user.name,
        lastname: this.user.lastname,
        email: this.user.email,
        password: this.user.password,
        roleId: Number(this.selectedRoleId) // Enviar roleId como número
      };

      console.log('Sending user data:', userToSend); // Para debug

      this.authService.signup(userToSend).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.validSignup = true;
          this.signUpError = '';
          // Redirigir al login después de 2 segundos
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        },
        error: (err: any) => {
          console.error('Signup error:', err);
          this.signUpError = err.error?.message || err.error?.description || 'Unknown internal server error.';
          this.validSignup = false;
        },
      });
    }
  }
}