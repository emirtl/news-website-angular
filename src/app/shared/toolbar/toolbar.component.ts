import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    RouterLink,
    TieredMenuModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  ngOnInit(): void {
    this.items = [
      {
        label: 'Categories',
        icon: 'pi pi-file',
        routerLink: '/admin/categories',
      },
      {
        label: 'authors',
        icon: 'pi pi-pencil',
        routerLink: '/admin/authors',
      },
      {
        label: 'News',
        icon: 'pi pi-envelope',
        routerLink: '/admin/news',
      },
      {
        label: 'Users',
        icon: 'pi pi-user',
        routerLink: '/admin/categories',
      },
    ];
  }
}
