import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  imports: [
    RouterModule,
    MatButton,
    MatIcon
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  ngOnInit(): void {}

}