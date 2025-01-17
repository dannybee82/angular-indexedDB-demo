import { Component, OnInit, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back-button',
  standalone: true,
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './go-back-button.component.html',
  styleUrl: './go-back-button.component.scss'
})
export class GoBackButtonComponent implements OnInit {

  private router = inject(Router);

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['/']);
  }

}