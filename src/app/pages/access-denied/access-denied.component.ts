import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss'
})
export class AccessDeniedComponent {
  private router: Router = inject(Router);
  private location: Location = inject(Location);
  
  goBack() {
    this.router.navigate(['/app/dashboard']);
  }
}