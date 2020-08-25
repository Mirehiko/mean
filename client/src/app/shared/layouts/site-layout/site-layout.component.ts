import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../classes/auth.guard';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef;

  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/analytics', name: 'Аналитика'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавить заказ'},
    {url: '/categories', name: 'Ассортимент'},
  ]

  constructor(
    private auth: AuthGuard,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    MaterialService.initFloatingButton(this.floatingRef);
  }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
